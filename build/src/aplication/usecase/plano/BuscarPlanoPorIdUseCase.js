import { PlanoService } from '../../../service/plano.servico';
// Define o comportamento e os dados desta classe.
export class BuscarPlanoPorIdUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new PlanoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(id) {
        return this.service.buscarPorId(id);
    }
}
//# sourceMappingURL=BuscarPlanoPorIdUseCase.js.map