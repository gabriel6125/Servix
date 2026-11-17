import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';

type ExcluirDiagnosticoInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class ExcluirDiagnosticoUseCase implements UseCase<ExcluirDiagnosticoInput, void> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new DiagnosticoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: ExcluirDiagnosticoInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
