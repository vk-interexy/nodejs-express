import { Router } from 'express';
import usersValidators from './validators/users.validators';
import { matchedData, validationResult } from 'express-validator';
import baseValidators from '../../validators/base.validators';
import 'express-async-errors';

import {
    UsersCreateRequest,
    UsersCreateResponse,
    UsersListRequest,
    UsersListResponse,
} from './users.interfaces';

const router = Router();

router.get('/', ...baseValidators.withPaginationParams(), async (req, res) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        res.status(400).send({ errors: validation.array() });

        return;
    }

    const data = matchedData(req) as UsersListRequest;

    const list: UsersListResponse = await req.services.users().list({
        limit: data.limit ?? 100,
        skip: data.skip,
    });

    req.logger.info('Fetching list of users', { data });

    res.json(list);
});

router.post('/', ...usersValidators.withUserParams(), async (req, res) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        res.status(400).send({ errors: validation.array() });

        return;
    }

    const data = matchedData(req) as UsersCreateRequest;

    const item: UsersCreateResponse = await req.services.users().create({
        data,
    });

    req.logger.info('Creating a user', { data });

    res.status(201).json(item);
});

export default router;
