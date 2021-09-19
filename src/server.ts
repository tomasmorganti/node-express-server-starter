import 'dotenv/config.js';
import app from '@/app';
import commonMiddleware from '@/middleware/common';
import applyMiddleware from '@/utils/applyMiddleware';
import routes from '@/routes';
import applyRoutes from '@/utils/applyRoutes';
import errorHandlers from '@/middleware/errorHandlers';
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

const startServer = async () => {
  applyMiddleware(commonMiddleware, app);
  applyRoutes(routes, app);
  applyMiddleware(errorHandlers, app);
  await connectDatabase(process.env.PG_CONNECTION_STRING);
  app.listen(PORT, () => {
    console.info(`Server is listening on http://localhost:${PORT}...`);
  });
};

startServer();
