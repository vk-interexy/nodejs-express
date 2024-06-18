import { Mongoose, connect } from 'mongoose';

export const connectMongo = async (mongoUri: string): Promise<Mongoose> => {
    return connect(mongoUri);
};
