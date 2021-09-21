import Knex from 'knex';
import { Model } from 'objection';

export const connectDatabase = async (db: Knex) => {
  console.info({ message: 'Testing database connection...' });
  try {
    await db.raw('Select 1 + 1 as result');
    Model.knex(db);
  } catch (err) {
    console.error({ message: `Database connection failed.`, extra: err });
    process.exit(1);
  }
  console.info({ message: 'Database connection looks good.' });
};
