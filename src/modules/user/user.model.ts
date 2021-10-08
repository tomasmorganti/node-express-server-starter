import { Model, ModelObject } from 'objection';

export default class User extends Model {
    id!: string;
    username!: string;
    password!: string;
    email!: string;
    verified!: boolean;
    active!: boolean;
    createdAt!: Date;
    updatedAt!: Date;

    static tableName = 'users';

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['id', 'username', 'password', 'email'],
            properties: {
                id: { type: 'string', format: 'uuid' },
                username: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', format: 'email' },
                verified: { type: 'boolean' },
                active: { type: 'boolean' },
            },
        };
    }
}

export type UserShape = ModelObject<User>;
