import { OrcamentoService } from '../../../service/orcamento.servico';
// Define o comportamento e os dados desta classe.
export class ListarOrcamentosUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new OrcamentoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(usuarioId) {
        return this.service.listar(usuarioId);
    }
}
//# sourceMappingURL=ListarOrcamentosUseCase.js.map