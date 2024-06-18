import { UserEntity } from '../entities/user.entity';

import {
    UserRepositoryCreateParams,
    UserRepositoryFindParams,
    UserRepositoryListParams,
} from './user.repository.interfaces';

export abstract class UserRepository {
    abstract create(params: UserRepositoryCreateParams): Promise<UserEntity>;
    abstract list(
        params: UserRepositoryListParams,
    ): Promise<{ list: UserEntity[]; count: number }>;
    abstract find(params: UserRepositoryFindParams): Promise<UserEntity | null>;
}
