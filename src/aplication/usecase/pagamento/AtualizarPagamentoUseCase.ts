import { PagamentoUpdateDto } from '../../dto/pagamento/pagamentoUpdateDto';
import { Pagamento } from '../../../dominio/entidades/pagamento';
import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarPagamentoInput = { id: string; usuarioId: string; dados: PagamentoUpdateDto };

// Define o comportamento e os dados desta classe.
export class AtualizarPagamentoUseCase implements UseCase<
    AtualizarPagamentoInput,
    Awaited<ReturnType<PagamentoService['atualizar']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new PagamentoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async execute({ id, usuarioId, dados }: AtualizarPagamentoInput): Promise<Awaited<ReturnType<PagamentoService['atualizar']>>> {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
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
