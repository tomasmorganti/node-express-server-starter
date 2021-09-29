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
    it('responds with statusCode 200 and body {message: "pong"}.', async () => {
      const { body } = await request(app).get('/ping').expect(400);
      expect(body).toBeObject();
      expect(body.message).toBe('pong');
    });
  });
  describe('[POST] /pong', () => {
    it('responds with statusCode 200 and body {message: "ping"}', async () => {
      const { body } = await request(app).post('/pong').send({ message: 'pong' }).expect(200);
      expect(body).toBeObject();
      expect(body.message).toBe('ping');
    });
  });
  describe('[POST] /pong bad request missing "message" parameter', () => {
    it('responds with statusCode 400', async () => {
      await request(app).post('/pong').expect(400);
    });
  });
});
