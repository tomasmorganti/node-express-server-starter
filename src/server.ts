import 'dotenv/config.js';

import app from '@/app';
import { connectDatabase } from '@/db';
import commonMiddleware from '@/middleware/common';
import errorHandlers from '@/middleware/errorHandlers';
import routes from '@/routes';
import applyMiddleware from '@/utils/applyMiddleware';
import applyRoutes from '@/utils/applyRoutes';
import validateEnv from '@/utils/validateEnv';

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

const startServer = async () => {
    validateEnv();
    applyMiddleware(commonMiddleware, app);
    applyRoutes(routes, app);
    applyMiddleware(errorHandlers, app);
    await connectDatabase(process.env.PG_CONNECTION_STRING);
    app.listen(process.env.PORT, () => {
        console.info(`Server is listening on http://localhost:${process.env.PORT}...`);
    });
};

startServer();
