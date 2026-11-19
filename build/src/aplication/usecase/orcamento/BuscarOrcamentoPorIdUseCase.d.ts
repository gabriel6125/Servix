import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';
type BuscarOrcamentoPorIdInput = {
    id: string;
    usuarioId: string;
};
export declare class BuscarOrcamentoPorIdUseCase implements UseCase<BuscarOrcamentoPorIdInput, Awaited<ReturnType<OrcamentoService['buscarPorId']>>> {
    private readonly service;
    execute(input: BuscarOrcamentoPorIdInput): Promise<Awaited<ReturnType<OrcamentoService['buscarPorId']>>>;
}
export {};
//# sourceMappingURL=BuscarOrcamentoPorIdUseCase.d.ts.map