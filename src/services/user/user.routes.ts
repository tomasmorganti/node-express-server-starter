import validateRequestParameters from '@/middleware/validateRequestParameters';

import * as UserController from './user.controller';

export default [
    {
        path: '/user',
        method: 'post',
        handler: [
            validateRequestParameters({
                properties: {
                    username: { type: 'string', minLength: 1, maxLength: 255 },
                    password: { type: 'string', minLength: 1, maxLength: 255 },
                    email: { type: 'string', format: 'email' },
                },
                required: ['username', 'password', 'email'],
            }),
            UserController.registerUser,
        ],
    },
];
