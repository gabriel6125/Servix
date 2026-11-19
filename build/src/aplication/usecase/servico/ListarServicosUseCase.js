import { ServicoService } from '../../../service/servico.servico';
// Define o comportamento e os dados desta classe.
export class ListarServicosUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new ServicoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(usuarioId) {
        return this.service.listar(usuarioId);
    }
}
//# sourceMappingURL=ListarServicosUseCase.js.map