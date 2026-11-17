import { PagamentoCreateDto } from '../../dto/pagamento/pagamentoCreateDto';
import { Pagamento } from '../../../dominio/entidades/pagamento';
import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';

type CriarPagamentoInput = { usuarioId: string; dados: PagamentoCreateDto };

// Define o comportamento e os dados desta classe.
export class CriarPagamentoUseCase implements UseCase<CriarPagamentoInput, Awaited<ReturnType<PagamentoService['salvar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new PagamentoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute({ usuarioId, dados }: CriarPagamentoInput): Promise<Awaited<ReturnType<PagamentoService['salvar']>>> {
        const pagamento = Pagamento.construir(
            dados.servico_id.toString(),
            dados.valor,
            dados.data_pagamento,
        );
        return this.service.salvar(pagamento, usuarioId);
    }
}
