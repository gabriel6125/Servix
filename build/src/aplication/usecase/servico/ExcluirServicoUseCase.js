import { ServicoService } from '../../../service/servico.servico';
// Define o comportamento e os dados desta classe.
export class ExcluirServicoUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new ServicoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(input) {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
//# sourceMappingURL=ExcluirServicoUseCase.js.map