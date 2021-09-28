import request from 'supertest';
import app from '@/app';
import { connectDatabase, KnexDB } from '@/db';
import applyRoutes from '@/utils/applyRoutes';
import bookRoutes from '@/services/book/book.routes';
import applyMiddleware from '@/utils/applyMiddleware';
import commonMiddleware from '@/middleware/common';
import errorHandlers from '@/middleware/errorHandlers';

let db: KnexDB;
let seededBooks: any;

beforeAll(async () => {
  applyMiddleware(commonMiddleware, app);
  applyRoutes(bookRoutes, app);
  applyMiddleware(errorHandlers, app);
  db = connectDatabase(process.env.PG_CONNECTION_STRING);
  // Seed anything
  seededBooks = await db('book')
    .insert([{ name: 'A Game of Thrones', author: 'George R. R. Martin' }])
    .returning('*');
});

afterAll(() => {
  db.destroy();
});

describe('Testing book routes', () => {
  it('[GET] /book/:id', async () => {
    const id = seededBooks[0].id;

    const { body: book } = await request(app).get(`/book/${id}`).expect(200);

    expect(book).toBeObject();
    expect(book.id).toBe(id);
    expect(book.name).toBe('A Game of Thrones');
  });
});
