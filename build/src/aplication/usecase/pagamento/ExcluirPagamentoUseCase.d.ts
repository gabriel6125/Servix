import type { UseCase } from '../UseCase';
type ExcluirPagamentoInput = {
    id: string;
    usuarioId: string;
};
export declare class ExcluirPagamentoUseCase implements UseCase<ExcluirPagamentoInput, void> {
    private readonly service;
    execute(input: ExcluirPagamentoInput): Promise<void>;
}
export {};
//# sourceMappingURL=ExcluirPagamentoUseCase.d.ts.map