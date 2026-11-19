import { ClienteService } from '../../../service/cliente.servico';
// Define o comportamento e os dados desta classe.
export class ListarClientesUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new ClienteService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(usuarioId) {
        return this.service.listar(usuarioId);
    }
}
//# sourceMappingURL=ListarClientesUseCase.js.map