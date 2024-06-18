import { UserEntity } from '../../../domain/entities/user.entity';

import {
    UserServiceCreateParams,
    UserServiceListParams,
} from '../../../services';

export type UsersItemResponse = UserEntity;

export type UsersListRequest = UserServiceListParams;

export type UsersListResponse = { list: UserEntity[]; count: number };

export type UsersCreateRequest = UserServiceCreateParams['data'];

export type UsersCreateResponse = UsersItemResponse;
