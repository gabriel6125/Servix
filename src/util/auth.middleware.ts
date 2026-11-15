import type { RequestHandler } from 'express';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { HttpError } from './http-error';
import { readTokenSubject } from './jwt';

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string;
    }
}

export const authMiddleware: RequestHandler = (request, _response, next) => {
    const authorization = request.get('authorization');
    const token = authorization?.startsWith('Bearer ')
        ? authorization.slice('Bearer '.length)
        : '';

    if (!token) {
        next(new HttpError(401, 'Token de autenticação não informado.'));
        return;
    }

    try {
        const userId = readTokenSubject(token);
        if (!userId || !/^[1-9]\d*$/.test(userId)) {
            next(new HttpError(401, 'Token de autenticação inválido.'));
            return;
        }
        request.userId = userId;
        next();
    } catch (error) {
        if (
            error instanceof JsonWebTokenError
            || error instanceof TokenExpiredError
            || error instanceof NotBeforeError
        ) {
            next(new HttpError(401, 'Token inválido ou expirado.'));
            return;
        }
        next(error);
    }
};
