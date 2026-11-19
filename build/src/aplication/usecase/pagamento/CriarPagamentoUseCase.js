import { PagamentoCreateDto } from '../../dto/pagamento/pagamentoCreateDto';
import { Pagamento } from '../../../dominio/entidades/pagamento';
import { PagamentoService } from '../../../service/pagamento.servico';
// Define o comportamento e os dados desta classe.
export class CriarPagamentoUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new PagamentoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute({ usuarioId, dados }) {
        const pagamento = Pagamento.construir(dados.servico_id.toString(), dados.valor, dados.data_pagamento);
        return this.service.salvar(pagamento, usuarioId);
    }
}
//# sourceMappingURL=CriarPagamentoUseCase.js.map