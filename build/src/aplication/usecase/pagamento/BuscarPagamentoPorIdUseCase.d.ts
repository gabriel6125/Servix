import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';
type BuscarPagamentoPorIdInput = {
    id: string;
    usuarioId: string;
};
export declare class BuscarPagamentoPorIdUseCase implements UseCase<BuscarPagamentoPorIdInput, Awaited<ReturnType<PagamentoService['buscarPorId']>>> {
    private readonly service;
    execute(input: BuscarPagamentoPorIdInput): Promise<Awaited<ReturnType<PagamentoService['buscarPorId']>>>;
}
export {};
//# sourceMappingURL=BuscarPagamentoPorIdUseCase.d.ts.map