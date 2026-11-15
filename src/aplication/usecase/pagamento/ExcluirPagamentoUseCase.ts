import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';

type ExcluirPagamentoInput = { id: string; usuarioId: string };

export class ExcluirPagamentoUseCase implements UseCase<ExcluirPagamentoInput, void> {
    private readonly service = new PagamentoService();

    public execute(input: ExcluirPagamentoInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
