import { HttpError } from '../../util/http-error';

// Implementa uma operacao reutilizavel deste modulo.
export function validarAtualizacao(dados: object): void {
    // Verifica a condicao antes de prosseguir para o fluxo alternativo.
    if (!Object.values(dados).some((valor) => valor !== undefined)) {
        throw new HttpError(400, 'Informe ao menos um campo para atualizar.');
    }
}
