import { PagamentoCreateDto } from '../../dto/pagamento/pagamentoCreateDto';
import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';
type CriarPagamentoInput = {
    usuarioId: string;
    dados: PagamentoCreateDto;
};
export declare class CriarPagamentoUseCase implements UseCase<CriarPagamentoInput, Awaited<ReturnType<PagamentoService['salvar']>>> {
    private readonly service;
    execute({ usuarioId, dados }: CriarPagamentoInput): Promise<Awaited<ReturnType<PagamentoService['salvar']>>>;
}
export {};
//# sourceMappingURL=CriarPagamentoUseCase.d.ts.map