import type { ErrorRequestHandler, RequestHandler, Response } from 'express';
import { HttpError } from './http-error';

export const notFoundHandler: RequestHandler = (_request, _response, next) => {
    next(new HttpError(404, 'Rota não encontrada.'));
};

export function responderErro(error: unknown, response: Response): void {
    if (error instanceof HttpError) {
        response.status(error.status).json({ error: { message: error.message } });
        return;
    }

    const errorType = getErrorType(error);
    if (errorType === 'entity.parse.failed') {
        response.status(400).json({ error: { message: 'O JSON enviado é inválido.' } });
        return;
    }
    if (errorType === 'entity.too.large') {
        response.status(413).json({ error: { message: 'O corpo da requisição excede o limite.' } });
        return;
    }

    const code = getDatabaseCode(error);
    if (code === '23505') {
        response.status(409).json({ error: { message: 'Já existe um registro com esses dados.' } });
        return;
    }
    if (code === '23503') {
        response.status(409).json({ error: { message: 'O registro está relacionado a outros dados e não pode ser removido.' } });
        return;
    }
    if (code === '23502' || code === '22P02' || code === '22003') {
        response.status(400).json({ error: { message: 'Os dados enviados são inválidos ou incompletos.' } });
        return;
    }

    console.error('Erro não tratado na API:', error);
    response.status(500).json({ error: { message: 'Erro interno do servidor.' } });
}

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
    void _next;
    responderErro(error, response);
};

function getDatabaseCode(error: unknown): string | undefined {
    if (
        error !== null
        && typeof error === 'object'
        && 'code' in error
        && typeof error.code === 'string'
    ) {
        return error.code;
    }
    return undefined;
}

function getErrorType(error: unknown): string | undefined {
    if (
        error !== null
        && typeof error === 'object'
        && 'type' in error
        && typeof error.type === 'string'
    ) {
        return error.type;
    }
    return undefined;
}
