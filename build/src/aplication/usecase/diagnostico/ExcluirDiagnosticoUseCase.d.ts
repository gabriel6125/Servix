import type { UseCase } from '../UseCase';
type ExcluirDiagnosticoInput = {
    id: string;
    usuarioId: string;
};
export declare class ExcluirDiagnosticoUseCase implements UseCase<ExcluirDiagnosticoInput, void> {
    private readonly service;
    execute(input: ExcluirDiagnosticoInput): Promise<void>;
}
export {};
//# sourceMappingURL=ExcluirDiagnosticoUseCase.d.ts.map