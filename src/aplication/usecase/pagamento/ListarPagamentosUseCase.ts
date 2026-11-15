import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';

export class ListarPagamentosUseCase implements UseCase<string, Awaited<ReturnType<PagamentoService['listar']>>> {
    private readonly service = new PagamentoService();

    public execute(usuarioId: string): Promise<Awaited<ReturnType<PagamentoService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
