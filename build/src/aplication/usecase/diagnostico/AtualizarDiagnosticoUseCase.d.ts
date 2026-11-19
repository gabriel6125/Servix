import { DiagnosticoUpdateDto } from '../../dto/diagnostico/diagnosticoUpdateDto';
import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';
type AtualizarDiagnosticoInput = {
    id: string;
    usuarioId: string;
    dados: DiagnosticoUpdateDto;
};
export declare class AtualizarDiagnosticoUseCase implements UseCase<AtualizarDiagnosticoInput, Awaited<ReturnType<DiagnosticoService['atualizar']>>> {
    private readonly service;
    execute({ id, usuarioId, dados }: AtualizarDiagnosticoInput): Promise<Awaited<ReturnType<DiagnosticoService['atualizar']>>>;
}
export {};
//# sourceMappingURL=AtualizarDiagnosticoUseCase.d.ts.map