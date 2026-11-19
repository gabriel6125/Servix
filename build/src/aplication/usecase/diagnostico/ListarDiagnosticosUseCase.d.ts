import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';
export declare class ListarDiagnosticosUseCase implements UseCase<string, Awaited<ReturnType<DiagnosticoService['listar']>>> {
    private readonly service;
    execute(usuarioId: string): Promise<Awaited<ReturnType<DiagnosticoService['listar']>>>;
}
//# sourceMappingURL=ListarDiagnosticosUseCase.d.ts.map