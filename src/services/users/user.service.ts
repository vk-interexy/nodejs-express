import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

import {
    UserServiceCreateParams,
    UserServiceFindParams,
    UserServiceListParams,
} from './user.interfaces';

export class UsersService {
    constructor(protected repository: UserRepository) {}

    async create(params: UserServiceCreateParams): Promise<UserEntity> {
        return this.repository.create(params);
    }

    async list(params: UserServiceListParams): Promise<{
        list: UserEntity[];
        count: number;
    }> {
        return this.repository.list(params);
    }

    async find(params: UserServiceFindParams): Promise<UserEntity | null> {
        return this.repository.find(params);
    }
}
