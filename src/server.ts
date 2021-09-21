import 'dotenv/config.js';
import app from '@/app';
import commonMiddleware from '@/middleware/common';
import applyMiddleware from '@/utils/applyMiddleware';
import routes from '@/routes';
import applyRoutes from '@/utils/applyRoutes';
import errorHandlers from '@/middleware/errorHandlers';
import db from '@/db';
import { connectDatabase } from '@/utils/connectDatabase';

process.on('uncaughtException', (e) => {
  console.error({
    message: `uncaughtException`,
    extra: e,
  });
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  console.error({
    message: `unhandledRejection`,
    extra: e,
  });
  process.exit(1);
});

const PORT = process.env.PORT;

const database = db(process.env.PG_CONNECTION_STRING);

const startServer = async () => {
  applyMiddleware(commonMiddleware, app);
  applyRoutes(routes, app);
  applyMiddleware(errorHandlers, app);
  await connectDatabase(database);
  app.listen(PORT, () => {
    console.info(`Server is listening on http://localhost:${PORT}...`);
  });
};

startServer();
