import { DespesaService } from '../../../service/despesa.servico';
// Define o comportamento e os dados desta classe.
export class ExcluirDespesaUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new DespesaService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(input) {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
//# sourceMappingURL=ExcluirDespesaUseCase.js.map