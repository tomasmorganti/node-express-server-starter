import { Knex, knex } from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';

export type KnexDB = Knex<any, unknown[]>;

export const connectDatabase = async (connection: string) => {
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
    try {
        await db.raw('Select 1 + 1 as result');
        Model.knex(db);
    } catch (e) {
        console.log('Database connection failed. Error: ' + e);
        process.exit(1);
    }
    Model.knex(db);
    return db;
};
