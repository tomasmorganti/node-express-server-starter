import request from 'supertest';
import app from '@/app';
import applyRoutes from '@/utils/applyRoutes';
import pingRoutes from '@/services/ping/ping.routes';
import applyMiddleware from '@/utils/applyMiddleware';
import commonMiddleware from '@/middleware/common';
import errorHandlers from '@/middleware/errorHandlers';

beforeAll(() => {
  applyMiddleware(commonMiddleware, app);
  applyRoutes(pingRoutes, app);
  applyMiddleware(errorHandlers, app);
});

describe('Testing ping routes', () => {
  describe('[GET] /ping', () => {
    it('responds with statusCode 200 and body {message: "pong"}.', () => {
      return request(app)
        .get('/ping')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({ message: 'pong' });
        });
    });
  });
  describe('[POST] /pong', () => {
    it('responds with statusCode 200 and body {message: "ping"}', async () => {
      return request(app)
        .post('/pong')
        .send({ message: 'pong' })
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({ message: 'ping' });
        });
    });
  });
  describe('[POST] /pong bad request missing "message" parameter', () => {
    it('responds with statusCode 400', async () => {
      return request(app).post('/pong').expect(400);
    });
  });
});
