import knex from 'knex';
import config from 'config';
import { knexSnakeCaseMappers } from 'objection';

const db = (connection: string) =>
  knex({
    client: 'pg',
    useNullAsDefault: true,
    connection,
    pool: {
      min: config.get('db.pool.min'),
      max: config.get('db.pool.max'),
    },
    ...knexSnakeCaseMappers(),
  });

export default db;
