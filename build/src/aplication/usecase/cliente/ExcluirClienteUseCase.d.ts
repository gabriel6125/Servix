import type { UseCase } from '../UseCase';
type ExcluirClienteInput = {
    id: string;
    usuarioId: string;
};
export declare class ExcluirClienteUseCase implements UseCase<ExcluirClienteInput, void> {
    private readonly service;
    execute(input: ExcluirClienteInput): Promise<void>;
}
export {};
//# sourceMappingURL=ExcluirClienteUseCase.d.ts.map