import { Request, Response } from 'express';

import Book, { BookShape } from '@/services/book/book.model';
import { HTTP404Error } from '@/utils/httpErrors';

export default [
    {
        path: '/book/:id',
        method: 'get',
        handler: [
            async (request: Request, response: Response) => {
                const { id } = request.params;
                const book: BookShape = await Book.query().findById(id);
                if (!book) {
                    throw new HTTP404Error('Book not found!!');
                }
                response.status(200).send(book);
            },
        ],
    },
];
