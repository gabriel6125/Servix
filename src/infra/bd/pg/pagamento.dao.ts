import { connection } from '../../../util/connection';
import { Pagamento, type propsPagamento } from '../../../dominio/entidades/pagamento';

// Define o comportamento e os dados desta classe.
export class PagamentoDao {
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async salvar(pagamento: Pagamento, usuarioId: string): Promise<Pagamento | null> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(
            `insert into pagamento (servico_id, valor, data_pagamento)
             select $1, $2, $3
             where exists (
                 select 1 from servico where id = $1 and usuario_id = $4
             )
             returning id, servico_id, valor, data_pagamento`,
            [pagamento.servicoId, pagamento.valor, pagamento.dataPagamento, usuarioId],
        );
        return result.rows[0] ? this.mapearPagamento(result.rows[0]) : null;
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(id: string, usuarioId: string): Promise<Pagamento | null> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(
            `select p.id, p.servico_id, p.valor, p.data_pagamento
             from pagamento p
             inner join servico s on s.id = p.servico_id
             where p.id = $1 and s.usuario_id = $2`,
            [id, usuarioId],
        );
        return result.rows[0] ? this.mapearPagamento(result.rows[0]) : null;
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async listar(usuarioId: string): Promise<Pagamento[]> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(
            `select p.id, p.servico_id, p.valor, p.data_pagamento
             from pagamento p
             inner join servico s on s.id = p.servico_id
             where s.usuario_id = $1 order by p.id`,
            [usuarioId],
        );
        return result.rows.map((row) => this.mapearPagamento(row));
    }

    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async atualizar(pagamento: Pagamento, usuarioId: string): Promise<Pagamento | null> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(
            `update pagamento
             set servico_id = $1, valor = $2, data_pagamento = $3
             where id = $4 and exists (
                 select 1 from servico
                 where id = pagamento.servico_id and usuario_id = $5
             )
             returning id, servico_id, valor, data_pagamento`,
            [pagamento.servicoId, pagamento.valor, pagamento.dataPagamento, pagamento.id, usuarioId],
        );
        return result.rows[0] ? this.mapearPagamento(result.rows[0]) : null;
    }

    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async excluir(id: string, usuarioId: string): Promise<boolean> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(
            `delete from pagamento p
             using servico s
             where p.servico_id = s.id and p.id = $1 and s.usuario_id = $2`,
            [id, usuarioId],
        );
        return (result.rowCount ?? 0) > 0;
    }

    // Metodo mapearPagamento: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    private mapearPagamento(row: Record<string, unknown>): Pagamento {
        const props: propsPagamento = {
            id: String(row.id),
            servicoId: String(row.servico_id),
            valor: Number(row.valor),
            dataPagamento: String(row.data_pagamento),
        };
        return Pagamento.reconstruir(props);
    }
}