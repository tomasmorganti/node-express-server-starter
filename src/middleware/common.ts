import { Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';

const handleHTTPHeaders = (router: Router) => router.use(helmet());

const handleCors = (router: Router) => router.use(cors({ credentials: true, origin: process.env.ORIGIN }));

const handleRateLimit = (router: Router) => {
    const limit = rateLimit({
        max: 500,
        windowMs: 60 * 60 * 1000,
        message: 'Too many requests',
    });
    router.use(limit);
};

const handleBodyRequestParsing = (router: Router) => {
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
};

const handleCompression = (router: Router) => {
    router.use(compression());
};

const handleCookie = (router: Router) => {
    router.use(cookieParser());
};

export default [handleHTTPHeaders, handleCors, handleRateLimit, handleBodyRequestParsing, handleCompression, handleCookie];
