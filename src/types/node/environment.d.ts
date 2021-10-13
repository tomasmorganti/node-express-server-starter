declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        PG_CONNECTION_STRING: string;
        CORS_ORIGIN: string;
        SENDGRID_API_KEY: string;
        FROM_EMAIL: string;
    }
}
