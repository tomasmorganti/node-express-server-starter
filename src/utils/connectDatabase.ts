import knex from 'knex';
import { Model, knexSnakeCaseMappers } from 'objection';
import config from 'config';

export const connectDatabase = async (connection: string) => {
  console.info({ message: 'Starting database connection...' });
  const db = knex({
    client: 'pg',
    useNullAsDefault: true,
    connection,
    pool: {
      min: config.get('db.pool.min'),
      max: config.get('db.pool.max'),
    },
    ...knexSnakeCaseMappers(),
  });
  try {
    await db.raw('Select 1 + 1 as result');
    Model.knex(db);
  } catch (err) {
    console.error({ message: `Database connection failed.`, extra: err });
    process.exit(1);
  }
  console.info({ message: 'Database connection looks good.' });
};
