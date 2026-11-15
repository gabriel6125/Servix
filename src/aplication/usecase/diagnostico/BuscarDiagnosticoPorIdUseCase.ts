import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';

type BuscarDiagnosticoPorIdInput = { id: string; usuarioId: string };

export class BuscarDiagnosticoPorIdUseCase implements UseCase<
    BuscarDiagnosticoPorIdInput,
    Awaited<ReturnType<DiagnosticoService['buscarPorId']>>
> {
    private readonly service = new DiagnosticoService();

    public execute(input: BuscarDiagnosticoPorIdInput): Promise<Awaited<ReturnType<DiagnosticoService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
