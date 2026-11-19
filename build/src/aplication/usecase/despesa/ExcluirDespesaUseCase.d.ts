import type { UseCase } from '../UseCase';
type ExcluirDespesaInput = {
    id: string;
    usuarioId: string;
};
export declare class ExcluirDespesaUseCase implements UseCase<ExcluirDespesaInput, void> {
    private readonly service;
    execute(input: ExcluirDespesaInput): Promise<void>;
}
export {};
//# sourceMappingURL=ExcluirDespesaUseCase.d.ts.map