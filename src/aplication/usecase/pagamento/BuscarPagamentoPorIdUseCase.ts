import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';

type BuscarPagamentoPorIdInput = { id: string; usuarioId: string };

export class BuscarPagamentoPorIdUseCase implements UseCase<
    BuscarPagamentoPorIdInput,
    Awaited<ReturnType<PagamentoService['buscarPorId']>>
> {
    private readonly service = new PagamentoService();

    public execute(input: BuscarPagamentoPorIdInput): Promise<Awaited<ReturnType<PagamentoService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
