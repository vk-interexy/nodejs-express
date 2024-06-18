import { ValidationChain, body } from 'express-validator';

export default {
    withUserParams: (): ValidationChain[] => [
        body('name').notEmpty().bail().isString(),
        body('age').notEmpty().bail().isInt({ min: 1 }),

        body('email')
            .notEmpty()
            .bail()
            .isEmail()
            .custom(async (email, { req }) => {
                const existingEmail = await req.services.users().find({
                    filters: { email },
                });

                if (existingEmail) {
                    throw new Error('Email already used');
                }

                return true;
            })
            .withMessage('Email cannot be used'),
    ],
};
