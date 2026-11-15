import { connection } from '../../../util/connection';
import { Orcamento, type propsOrcamento } from '../../../dominio/entidades/orcamento';

export class OrcamentoDao {
    public async salvar(orcamento: Orcamento, usuarioId: string): Promise<Orcamento | null> {
        const result = await connection.query(
            `insert into orcamento
                (servico_id, valor_pecas, valor_mao_de_obra, outros_custos,
                 valor_total, status, link_acesso)
             select $1, $2, $3, $4, $5, $6, $7
             where exists (
                 select 1 from servico where id = $1 and usuario_id = $8
             )
             returning id, servico_id, valor_pecas, valor_mao_de_obra, outros_custos,
                       valor_total, status, link_acesso`,
            [
                orcamento.servicoId,
                orcamento.valorPecas,
                orcamento.valorMaoDeObra,
                orcamento.outrosCustos,
                orcamento.valorTotal,
                orcamento.status,
                orcamento.linkAcesso,
                usuarioId,
            ],
        );
        return result.rows[0] ? this.mapearOrcamento(result.rows[0]) : null;
    }

    public async buscarPorId(id: string, usuarioId: string): Promise<Orcamento | null> {
        const result = await connection.query(
            `select o.id, o.servico_id, o.valor_pecas, o.valor_mao_de_obra,
                    o.outros_custos, o.valor_total, o.status, o.link_acesso
             from orcamento o
             inner join servico s on s.id = o.servico_id
             where o.id = $1 and s.usuario_id = $2`,
            [id, usuarioId],
        );
        return result.rows[0] ? this.mapearOrcamento(result.rows[0]) : null;
    }

    public async listar(usuarioId: string): Promise<Orcamento[]> {
        const result = await connection.query(
            `select o.id, o.servico_id, o.valor_pecas, o.valor_mao_de_obra,
                    o.outros_custos, o.valor_total, o.status, o.link_acesso
             from orcamento o
             inner join servico s on s.id = o.servico_id
             where s.usuario_id = $1 order by o.id`,
            [usuarioId],
        );
        return result.rows.map((row) => this.mapearOrcamento(row));
    }

    public async atualizar(orcamento: Orcamento, usuarioId: string): Promise<Orcamento | null> {
        const result = await connection.query(
            `update orcamento
             set servico_id = $1, valor_pecas = $2, valor_mao_de_obra = $3,
                 outros_custos = $4, valor_total = $5, status = $6, link_acesso = $7
             where id = $8 and exists (
                 select 1 from servico
                 where id = orcamento.servico_id and usuario_id = $9
             )
             returning id, servico_id, valor_pecas, valor_mao_de_obra, outros_custos,
                       valor_total, status, link_acesso`,
            [
                orcamento.servicoId,
                orcamento.valorPecas,
                orcamento.valorMaoDeObra,
                orcamento.outrosCustos,
                orcamento.valorTotal,
                orcamento.status,
                orcamento.linkAcesso,
                orcamento.id,
                usuarioId,
            ],
        );
        return result.rows[0] ? this.mapearOrcamento(result.rows[0]) : null;
    }

    public async excluir(id: string, usuarioId: string): Promise<boolean> {
        const result = await connection.query(
            `delete from orcamento o
             using servico s
             where o.servico_id = s.id and o.id = $1 and s.usuario_id = $2`,
            [id, usuarioId],
        );
        return (result.rowCount ?? 0) > 0;
    }

    private mapearOrcamento(row: Record<string, unknown>): Orcamento {
        const props: propsOrcamento = {
            id: String(row.id),
            servicoId: String(row.servico_id),
            valorPecas: row.valor_pecas === null ? null : Number(row.valor_pecas),
            valorMaoDeObra: row.valor_mao_de_obra === null ? null : Number(row.valor_mao_de_obra),
            outrosCustos: row.outros_custos === null ? null : Number(row.outros_custos),
            valorTotal: Number(row.valor_total),
            status: String(row.status),
            linkAcesso: row.link_acesso === null ? null : String(row.link_acesso),
        };
        return Orcamento.reconstruir(props);
    }
}