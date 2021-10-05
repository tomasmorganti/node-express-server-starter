import { Request, Response } from 'express';
import validateRequestParameters from '@/middleware/validateRequestParameters';

export default [
  {
    path: '/ping',
    method: 'get',
    handler: (req: Request, res: Response) => {
      res.status(200).send({ message: 'pong' });
    },
  },
  {
    path: '/pong',
    method: 'post',
    handler: [
      validateRequestParameters({
        properties: {
          message: { type: 'string' },
        },
        required: ['message'],
      }),
      (req: Request, res: Response) => {
        res.status(200).send({ message: 'ping' });
      },
    ],
  },
];
