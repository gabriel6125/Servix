import { ClienteService } from '../../../service/cliente.servico';
// Define o comportamento e os dados desta classe.
export class BuscarClientePorIdUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new ClienteService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(input) {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
//# sourceMappingURL=BuscarClientePorIdUseCase.js.map