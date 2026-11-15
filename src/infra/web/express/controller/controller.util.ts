import type { Request } from 'express';
import { HttpError } from '../../../../util/http-error';

export function usuarioAutenticado(request: Request): string {
    if (!request.userId) {
        throw new HttpError(401, 'Usuário não autenticado.');
    }
    return request.userId;
}

export function idDaRota(request: Request): string {
    const id = request.params.id;
    if (typeof id !== 'string' || !/^[1-9]\d*$/.test(id)) {
        throw new HttpError(400, 'Identificador inválido.');
    }
    return id;
}
