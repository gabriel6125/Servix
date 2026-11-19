import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';
type BuscarDiagnosticoPorIdInput = {
    id: string;
    usuarioId: string;
};
export declare class BuscarDiagnosticoPorIdUseCase implements UseCase<BuscarDiagnosticoPorIdInput, Awaited<ReturnType<DiagnosticoService['buscarPorId']>>> {
    private readonly service;
    execute(input: BuscarDiagnosticoPorIdInput): Promise<Awaited<ReturnType<DiagnosticoService['buscarPorId']>>>;
}
export {};
//# sourceMappingURL=BuscarDiagnosticoPorIdUseCase.d.ts.map