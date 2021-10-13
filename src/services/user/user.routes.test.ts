import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import app from '@/app';
import { connectDatabase, KnexDB } from '@/db';
import commonMiddleware from '@/middleware/common';
import errorHandlers from '@/middleware/errorHandlers';
import applyMiddleware from '@/utils/applyMiddleware';
import applyRoutes from '@/utils/applyRoutes';

import userRoutes from './user.routes';

let db: KnexDB;
let seededUsers: any;

beforeAll(async () => {
    applyMiddleware(commonMiddleware, app);
    applyRoutes(userRoutes, app);
    applyMiddleware(errorHandlers, app);
    db = await connectDatabase(process.env.PG_CONNECTION_STRING);
    // Seed anything
    seededUsers = await db('users')
        .insert([{ id: uuidv4(), username: 'test_user', password: 'password', email: 'test@test.com' }])
        .returning('*');
});

afterAll(() => {
    db.destroy();
});

describe('Testing user routes', () => {
    describe('[POST] /user', () => {
        it('returns 201 response code and RegisterUserResObj in body', async () => {
            const { body } = await request(app)
                .post(`/user`)
                .send({
                    username: 'success_user',
                    password: 'password',
                    email: 'test@test.com',
                })
                .expect(201);
            expect(body).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    username: 'success_user',
                    email: 'test@test.com',
                    verified: false,
                    active: true,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                }),
            );
            expect(body).toEqual(
                expect.not.objectContaining({
                    password: expect.any(String),
                }),
            );
        });
        it('returns 400 response code as username already exists', async () => {
            await request(app)
                .post(`/user`)
                .send({
                    username: seededUsers[0].username,
                    password: 'password',
                    email: 'test@test.com',
                })
                .expect(400);
        });
        it('returns 400 response code as email format is invalid', async () => {
            await request(app)
                .post(`/user`)
                .send({
                    username: 'invalid_email',
                    password: 'password',
                    email: 'test',
                })
                .expect(400);
        });
        it('returns 400 response code as email is missing', async () => {
            await request(app)
                .post(`/user`)
                .send({
                    username: 'missing_email',
                    password: 'password',
                })
                .expect(400);
        });
        it('returns 400 response code as username is missing', async () => {
            await request(app)
                .post(`/user`)
                .send({
                    password: 'password',
                    email: 'test',
                })
                .expect(400);
        });
        it('returns 400 response code as password is missing', async () => {
            await request(app)
                .post(`/user`)
                .send({
                    username: 'missing_password',
                    email: 'test',
                })
                .expect(400);
        });
    });
});
