import 'dotenv/config.js';
import validateEnv from '@/utils/validateEnv';
import app from '@/app';
import applyMiddleware from '@/utils/applyMiddleware';
import commonMiddleware from '@/middleware/common';
import applyRoutes from '@/utils/applyRoutes';
import routes from '@/routes';
import errorHandlers from '@/middleware/errorHandlers';
import { connectDatabase } from '@/db';
import { sendEmail } from './modules/email/email.provider';

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

// sendEmail();

const startServer = async () => {
    validateEnv();
    applyMiddleware(commonMiddleware, app);
    applyRoutes(routes, app);
    applyMiddleware(errorHandlers, app);
    connectDatabase(process.env.PG_CONNECTION_STRING);
    app.listen(process.env.PORT, () => {
        console.info(`Server is listening on http://localhost:${process.env.PORT}...`);
    });
};

startServer();
