import { knex, Knex } from 'knex';
import { Model, knexSnakeCaseMappers } from 'objection';

export type KnexDB = Knex<any, unknown[]>;

export const connectDatabase = (connection: string) => {
    const db = knex({
        client: 'pg',
        useNullAsDefault: true,
        connection,
        pool: {
            min: 2,
            max: 10,
        },
        ...knexSnakeCaseMappers(),
    });
    Model.knex(db);
    return db;
};
