import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';

export class ListarDiagnosticosUseCase implements UseCase<string, Awaited<ReturnType<DiagnosticoService['listar']>>> {
    private readonly service = new DiagnosticoService();

    public execute(usuarioId: string): Promise<Awaited<ReturnType<DiagnosticoService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
