import { HttpError } from '../../util/http-error';

export function validarAtualizacao(dados: object): void {
    if (!Object.values(dados).some((valor) => valor !== undefined)) {
        throw new HttpError(400, 'Informe ao menos um campo para atualizar.');
    }
}
