import { ValidationChain, query } from 'express-validator';

export default {
    withPaginationParams: (): ValidationChain[] => [
        query('limit').optional().isInt({ min: 1, max: 1000 }).toInt(),
        query('skip').optional().isInt({ min: 0 }).toInt(),
    ],
};
