import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
    cleanEnv(process.env, {
        PORT: port(),
        PG_CONNECTION_STRING: str(),
        CORS_ORIGIN: str(),
        SENDGRID_API_KEY: str(),
    });
};

export default validateEnv;
