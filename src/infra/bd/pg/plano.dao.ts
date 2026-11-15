import { connection } from '../../../util/connection';
import { Plano, type propsPlano } from '../../../dominio/entidades/plano';

export class PlanoDao {
    public async salvar(plano: Plano): Promise<Plano> {
        const result = await connection.query(
            `insert into plano (nome, valor, periodicidade, funcionalidades)
             values ($1, $2, $3, $4)
             returning id, nome, valor, periodicidade, funcionalidades`,
            [plano.nome, plano.valor, plano.periodicidade, plano.funcionalidades],
        );
        return this.mapearPlano(result.rows[0]);
    }

    public async buscarPorId(id: string): Promise<Plano | null> {
        const result = await connection.query(
            'select id, nome, valor, periodicidade, funcionalidades from plano where id = $1',
            [id],
        );
        return result.rows[0] ? this.mapearPlano(result.rows[0]) : null;
    }

    public async listar(): Promise<Plano[]> {
        const result = await connection.query(
            'select id, nome, valor, periodicidade, funcionalidades from plano order by id',
        );
        return result.rows.map((row) => this.mapearPlano(row));
    }

    public async atualizar(plano: Plano): Promise<Plano | null> {
        const result = await connection.query(
            `update plano
             set nome = $1, valor = $2, periodicidade = $3, funcionalidades = $4
             where id = $5
             returning id, nome, valor, periodicidade, funcionalidades`,
            [plano.nome, plano.valor, plano.periodicidade, plano.funcionalidades, plano.id],
        );
        return result.rows[0] ? this.mapearPlano(result.rows[0]) : null;
    }

    public async excluir(id: string): Promise<boolean> {
        const result = await connection.query('delete from plano where id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }

    private mapearPlano(row: Record<string, unknown>): Plano {
        const props: propsPlano = {
            id: String(row.id),
            nome: String(row.nome),
            valor: Number(row.valor),
            periodicidade: String(row.periodicidade),
            funcionalidades: Array.isArray(row.funcionalidades)
                ? row.funcionalidades.map(String)
                : null,
        };
        return Plano.reconstruir(props);
    }
}
