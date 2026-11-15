import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Request, Response } from 'express';
import { responderErro } from '../../../../util/error-handler';
import { HttpError } from '../../../../util/http-error';

export function tratarErroDoController(error: unknown, response: Response): Response {
    responderErro(error, response);
    return response;
}

export function usuarioAutenticado(request: Request): string {
    if (!request.userId) {
        throw new HttpError(401, 'Usuário não autenticado.');
    }
    return request.userId;
}

export async function idDaRota(
    request: Request,
    Dto: new () => { id: string },
): Promise<string> {
    const dto = plainToInstance(Dto, { id: request.params.id });
    const errors = await validate(dto);
    if (errors.length > 0) {
        throw new HttpError(400, 'Identificador inválido.');
    }
    return dto.id;
}
