export {};

import winston from 'winston';
import { UsersService } from '../../services';

declare global {
    namespace Express {
        export interface Request {
            logger: winston.Logger;
            services: {
                users: () => UsersService;
            };
        }
    }
}
