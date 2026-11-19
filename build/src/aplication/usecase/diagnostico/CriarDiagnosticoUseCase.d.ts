import { DiagnosticoCreateDto } from '../../dto/diagnostico/diagnosticoCreateDto';
import { DiagnosticoService } from '../../../service/diagnostico.servico';
import type { UseCase } from '../UseCase';
type CriarDiagnosticoInput = {
    usuarioId: string;
    dados: DiagnosticoCreateDto;
};
export declare class CriarDiagnosticoUseCase implements UseCase<CriarDiagnosticoInput, Awaited<ReturnType<DiagnosticoService['salvar']>>> {
    private readonly service;
    execute({ usuarioId, dados }: CriarDiagnosticoInput): Promise<Awaited<ReturnType<DiagnosticoService['salvar']>>>;
}
export {};
//# sourceMappingURL=CriarDiagnosticoUseCase.d.ts.map