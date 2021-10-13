import { cleanEnv, port, str, email } from 'envalid';

const validateEnv = () => {
    cleanEnv(process.env, {
        PORT: port(),
        PG_CONNECTION_STRING: str(),
        CORS_ORIGIN: str(),
        SENDGRID_API_KEY: str(),
        FROM_EMAIL: email(),
    });
};

export default validateEnv;
