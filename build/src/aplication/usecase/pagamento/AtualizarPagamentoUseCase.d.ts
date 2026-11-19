import { PagamentoUpdateDto } from '../../dto/pagamento/pagamentoUpdateDto';
import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';
type AtualizarPagamentoInput = {
    id: string;
    usuarioId: string;
    dados: PagamentoUpdateDto;
};
export declare class AtualizarPagamentoUseCase implements UseCase<AtualizarPagamentoInput, Awaited<ReturnType<PagamentoService['atualizar']>>> {
    private readonly service;
    execute({ id, usuarioId, dados }: AtualizarPagamentoInput): Promise<Awaited<ReturnType<PagamentoService['atualizar']>>>;
}
export {};
//# sourceMappingURL=AtualizarPagamentoUseCase.d.ts.map