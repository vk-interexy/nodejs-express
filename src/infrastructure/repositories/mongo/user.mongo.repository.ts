import { Model, Types } from 'mongoose';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserModel } from '../../models/mongo/user.mongo.model';

import {
    UserRepositoryCreateParams,
    UserRepositoryFindParams,
    UserRepositoryListParams,
} from '../../../domain/repositories/user.repository.interfaces';

export class UserMongoRepository extends UserRepository {
    constructor(protected model: Model<UserModel>) {
        super();
    }

    async create(params: UserRepositoryCreateParams): Promise<UserEntity> {
        const user = new this.model({
            name: params.data.name,
            email: params.data.email,
            age: params.data.age,
        });

        const userData = await user.save();

        return this.map(userData);
    }

    async list(params: UserRepositoryListParams): Promise<{
        list: UserEntity[];
        count: number;
    }> {
        const [list, count] = await Promise.all([
            this.model
                .find({}, {}, { skip: params.skip, limit: params.limit })
                .exec(),

            this.model.countDocuments(),
        ]);

        return { list: list.map((user) => this.map(user)), count: count };
    }

    async find(params: UserRepositoryFindParams): Promise<UserEntity | null> {
        const filter =
            'email' in params.filters
                ? { email: params.filters.email }
                : { _id: params.filters.id };

        const user = await this.model.findOne(filter).exec();

        return user ? this.map(user) : null;
    }

    private map(data: UserModel & { _id: Types.ObjectId }): UserEntity {
        return {
            id: data._id.toString(),
            name: data.name,
            email: data.email,
            age: data.age,
        };
    }
}
