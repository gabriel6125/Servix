import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';
export declare class ListarPagamentosUseCase implements UseCase<string, Awaited<ReturnType<PagamentoService['listar']>>> {
    private readonly service;
    execute(usuarioId: string): Promise<Awaited<ReturnType<PagamentoService['listar']>>>;
}
//# sourceMappingURL=ListarPagamentosUseCase.d.ts.map