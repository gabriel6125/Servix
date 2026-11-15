import { PagamentoCreateDto } from '../../dto/pagamento/pagamentoCreateDto';
import { Pagamento } from '../../../dominio/entidades/pagamento';
import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';

type CriarPagamentoInput = { usuarioId: string; dados: PagamentoCreateDto };

export class CriarPagamentoUseCase implements UseCase<CriarPagamentoInput, Awaited<ReturnType<PagamentoService['salvar']>>> {
    private readonly service = new PagamentoService();

    public execute({ usuarioId, dados }: CriarPagamentoInput): Promise<Awaited<ReturnType<PagamentoService['salvar']>>> {
        const pagamento = Pagamento.construir(
            dados.servico_id.toString(),
            dados.valor,
            dados.data_pagamento,
        );
        return this.service.salvar(pagamento, usuarioId);
    }
}
