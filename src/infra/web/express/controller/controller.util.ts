import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Request, Response } from 'express';
import { responderErro } from '../../../../util/error-handler';
import { HttpError } from '../../../../util/http-error';

// Implementa uma operacao reutilizavel deste modulo.
export function tratarErroDoController(error: unknown, response: Response): Response {
    responderErro(error, response);
    return response;
}

// Implementa uma operacao reutilizavel deste modulo.
export function usuarioAutenticado(request: Request): string {
    // Verifica a condicao antes de prosseguir para o fluxo alternativo.
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
    // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
    const errors = await validate(dto);
    // Verifica a condicao antes de prosseguir para o fluxo alternativo.
    if (errors.length > 0) {
        throw new HttpError(400, 'Identificador inválido.');
    }
    return dto.id;
}
