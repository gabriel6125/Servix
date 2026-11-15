import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';

type ExcluirDiagnosticoInput = { id: string; usuarioId: string };

export class ExcluirDiagnosticoUseCase implements UseCase<ExcluirDiagnosticoInput, void> {
    private readonly service = new DiagnosticoService();

    public execute(input: ExcluirDiagnosticoInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
