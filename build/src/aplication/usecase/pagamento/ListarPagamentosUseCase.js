import { PagamentoService } from '../../../service/pagamento.servico';
// Define o comportamento e os dados desta classe.
export class ListarPagamentosUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new PagamentoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(usuarioId) {
        return this.service.listar(usuarioId);
    }
}
//# sourceMappingURL=ListarPagamentosUseCase.js.map