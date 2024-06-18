import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './api/routes';
import { rateLimit } from 'express-rate-limit';
import winston, { format, transports } from 'winston';
import { UsersService } from './services';
import { UserMongoRepository } from './infrastructure/repositories/mongo/user.mongo.repository';
import { getUserModel } from './infrastructure/models/mongo/user.mongo.model';
import { connectMongo } from './infrastructure/database/mongo';

dotenv.config();

const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGO_URI || '';
const isDevEnvironment = process.env.NODE_ENV === 'development';

async function main() {
    // init logger
    const logger = winston.createLogger({
        format: format.combine(format.splat(), format.simple()),
        transports: [new transports.Console()],
    });

    // init mongo
    const mongoose = await connectMongo(mongoUri);
    const userRepository = new UserMongoRepository(getUserModel(mongoose));

    const app: Application = express();

    app.use(bodyParser.json());
    app.use((req, _, next) => {
        req.logger = logger;
        req.services = {
            users: () => new UsersService(userRepository),
        };

        next();
    });

    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 5,
    });
    app.use(limiter);

    app.use('/', router);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        const errorMessage = err.message || 'Something went wrong';
        const errorStatus = 500;

        if (isDevEnvironment) {
            res.status(errorStatus).json({});

            return next(err);
        }

        res.status(errorStatus).json({
            success: false,
            status: errorStatus,
            message: errorMessage,
            stack: err.stack,
        });

        next(err);
    });

    app.listen(port, () => {
        console.log(`Server is Fire at http://localhost:${port}`);
    });
}

main();
