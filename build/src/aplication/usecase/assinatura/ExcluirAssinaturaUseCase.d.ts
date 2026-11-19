import type { UseCase } from '../UseCase';
type ExcluirAssinaturaInput = {
    id: string;
    usuarioId: string;
};
export declare class ExcluirAssinaturaUseCase implements UseCase<ExcluirAssinaturaInput, void> {
    private readonly service;
    execute(input: ExcluirAssinaturaInput): Promise<void>;
}
export {};
//# sourceMappingURL=ExcluirAssinaturaUseCase.d.ts.map