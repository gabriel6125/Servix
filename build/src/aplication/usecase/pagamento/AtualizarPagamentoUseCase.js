import { PagamentoUpdateDto } from '../../dto/pagamento/pagamentoUpdateDto';
import { Pagamento } from '../../../dominio/entidades/pagamento';
import { PagamentoService } from '../../../service/pagamento.servico';
import { validarAtualizacao } from '../validar-atualizacao';
// Define o comportamento e os dados desta classe.
export class AtualizarPagamentoUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new PagamentoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async execute({ id, usuarioId, dados }) {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atual = await this.service.buscarPorId(id, usuarioId);
        const pagamento = Pagamento.reconstruir({
            id,
            servicoId: dados.servico_id?.toString() ?? atual.servicoId,
            valor: dados.valor ?? atual.valor,
            dataPagamento: dados.data_pagamento ?? atual.dataPagamento,
        });
        return this.service.atualizar(pagamento, usuarioId);
    }
}
//# sourceMappingURL=AtualizarPagamentoUseCase.js.map