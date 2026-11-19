import { DiagnosticoCreateDto } from '../../dto/diagnostico/diagnosticoCreateDto';
import { Diagnostico } from '../../../dominio/entidades/diagnostico';
import { DiagnosticoService } from '../../../service/diagnostico.servico';
// Define o comportamento e os dados desta classe.
export class CriarDiagnosticoUseCase {
    constructor() {
        // Mantem a dependencia service disponivel para as operacoes da classe.
        this.service = new DiagnosticoService();
    }
    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    execute({ usuarioId, dados }) {
        const diagnostico = Diagnostico.construir(dados.servico_id.toString(), dados.problema_identificado, dados.observacoes ?? null);
        return this.service.salvar(diagnostico, usuarioId);
    }
}
//# sourceMappingURL=CriarDiagnosticoUseCase.js.map