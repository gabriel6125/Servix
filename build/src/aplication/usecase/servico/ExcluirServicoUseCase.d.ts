import type { UseCase } from '../UseCase';
type ExcluirServicoInput = {
    id: string;
    usuarioId: string;
};
export declare class ExcluirServicoUseCase implements UseCase<ExcluirServicoInput, void> {
    private readonly service;
    execute(input: ExcluirServicoInput): Promise<void>;
}
export {};
//# sourceMappingURL=ExcluirServicoUseCase.d.ts.map