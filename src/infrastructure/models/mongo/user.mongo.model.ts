import { Model, Mongoose, Schema } from 'mongoose';
import { UserEntity } from '../../../domain/entities/user.entity';

export type UserModel = Omit<UserEntity, 'id'>;

export const getUserModel = (mongoose: Mongoose): Model<UserModel> => {
    const userSchema = new Schema<UserModel>({
        name: String,
        email: { type: String, unique: true },
        age: Number,
    });

    return mongoose.model<UserModel>('User', userSchema);
};
