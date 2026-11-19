import type { UseCase } from '../UseCase';
type ExcluirOrcamentoInput = {
    id: string;
    usuarioId: string;
};
export declare class ExcluirOrcamentoUseCase implements UseCase<ExcluirOrcamentoInput, void> {
    private readonly service;
    execute(input: ExcluirOrcamentoInput): Promise<void>;
}
export {};
//# sourceMappingURL=ExcluirOrcamentoUseCase.d.ts.map