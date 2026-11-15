import { connection } from '../../../util/connection';
import { Despesa, type propsDespesa } from '../../../dominio/entidades/despesa';

export class DespesaDao {
    public async salvar(despesa: Despesa): Promise<Despesa> {
        const result = await connection.query(
            `insert into despesa (usuario_id, descricao, valor, data_despesa)
             values ($1, $2, $3, $4)
             returning id, usuario_id, descricao, valor, data_despesa`,
            [despesa.usuarioId, despesa.descricao, despesa.valor, despesa.dataDespesa],
        );
        return this.mapearDespesa(result.rows[0]);
    }

    public async buscarPorId(id: string, usuarioId: string): Promise<Despesa | null> {
        const result = await connection.query(
            `select id, usuario_id, descricao, valor, data_despesa
             from despesa where id = $1 and usuario_id = $2`,
            [id, usuarioId],
        );
        return result.rows[0] ? this.mapearDespesa(result.rows[0]) : null;
    }

    public async listar(usuarioId: string): Promise<Despesa[]> {
        const result = await connection.query(
            `select id, usuario_id, descricao, valor, data_despesa
             from despesa where usuario_id = $1 order by id`,
            [usuarioId],
        );
        return result.rows.map((row) => this.mapearDespesa(row));
    }

    public async atualizar(despesa: Despesa): Promise<Despesa | null> {
        const result = await connection.query(
            `update despesa
             set descricao = $1, valor = $2, data_despesa = $3
             where id = $4 and usuario_id = $5
             returning id, usuario_id, descricao, valor, data_despesa`,
            [despesa.descricao, despesa.valor, despesa.dataDespesa, despesa.id, despesa.usuarioId],
        );
        return result.rows[0] ? this.mapearDespesa(result.rows[0]) : null;
    }

    public async excluir(id: string, usuarioId: string): Promise<boolean> {
        const result = await connection.query(
            'delete from despesa where id = $1 and usuario_id = $2',
            [id, usuarioId],
        );
        return (result.rowCount ?? 0) > 0;
    }

    private mapearDespesa(row: Record<string, unknown>): Despesa {
        const props: propsDespesa = {
            id: String(row.id),
            usuarioId: String(row.usuario_id),
            descricao: String(row.descricao),
            valor: Number(row.valor),
            dataDespesa: String(row.data_despesa),
        };
        return Despesa.reconstruir(props);
    }
}
