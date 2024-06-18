import {
    UserRepositoryCreateParams,
    UserRepositoryFindParams,
    UserRepositoryListParams,
} from '../../domain/repositories/user.repository.interfaces';

export type UserServiceCreateParams = UserRepositoryCreateParams;

export type UserServiceListParams = UserRepositoryListParams;

export type UserServiceFindParams = UserRepositoryFindParams;
