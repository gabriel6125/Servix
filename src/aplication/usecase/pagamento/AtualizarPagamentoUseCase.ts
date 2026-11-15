import { PagamentoUpdateDto } from '../../dto/pagamento/pagamentoUpdateDto';
import { Pagamento } from '../../../dominio/entidades/pagamento';
import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarPagamentoInput = { id: string; usuarioId: string; dados: PagamentoUpdateDto };

export class AtualizarPagamentoUseCase implements UseCase<
    AtualizarPagamentoInput,
    Awaited<ReturnType<PagamentoService['atualizar']>>
> {
    private readonly service = new PagamentoService();

    public async execute({ id, usuarioId, dados }: AtualizarPagamentoInput): Promise<Awaited<ReturnType<PagamentoService['atualizar']>>> {
        validarAtualizacao(dados);
        const atual = await this.service.buscarPorId(id, usuarioId);
        const pagamento = Pagamento.reconstruir({
            id,
            servicoId: dados.servico_id?.toString() ?? atual.servicoId,
            valor: dados.valor ?? atual.valor,
            dataPagamento: dados.data_pagamento ?? atual.dataPagamento,
        });
        return this.service.atualizar(pagamento, usuarioId);
    }
}
