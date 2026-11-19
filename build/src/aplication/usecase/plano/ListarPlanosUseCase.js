import { PlanoService } from '../../../service/plano.servico';
// Define o comportamento e os dados desta classe.
export class ListarPlanosUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new PlanoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute() {
        return this.service.listar();
    }
}
//# sourceMappingURL=ListarPlanosUseCase.js.map