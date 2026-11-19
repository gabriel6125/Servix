import { DiagnosticoService } from '../../../service/diagnostico.servico';
// Define o comportamento e os dados desta classe.
export class BuscarDiagnosticoPorIdUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new DiagnosticoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute(input) {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
//# sourceMappingURL=BuscarDiagnosticoPorIdUseCase.js.map