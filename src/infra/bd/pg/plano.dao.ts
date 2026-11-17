import { connection } from '../../../util/connection';
import { Plano, type propsPlano } from '../../../dominio/entidades/plano';

// Define o comportamento e os dados desta classe.
export class PlanoDao {
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async salvar(plano: Plano): Promise<Plano> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(
            `insert into plano (nome, valor, periodicidade, funcionalidades)
             values ($1, $2, $3, $4)
             returning id, nome, valor, periodicidade, funcionalidades`,
            [plano.nome, plano.valor, plano.periodicidade, plano.funcionalidades],
        );
        return this.mapearPlano(result.rows[0]);
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(id: string): Promise<Plano | null> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(
            'select id, nome, valor, periodicidade, funcionalidades from plano where id = $1',
            [id],
        );
        return result.rows[0] ? this.mapearPlano(result.rows[0]) : null;
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async listar(): Promise<Plano[]> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(
            'select id, nome, valor, periodicidade, funcionalidades from plano order by id',
        );
        return result.rows.map((row) => this.mapearPlano(row));
    }

    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async atualizar(plano: Plano): Promise<Plano | null> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(
            `update plano
             set nome = $1, valor = $2, periodicidade = $3, funcionalidades = $4
             where id = $5
             returning id, nome, valor, periodicidade, funcionalidades`,
            [plano.nome, plano.valor, plano.periodicidade, plano.funcionalidades, plano.id],
        );
        return result.rows[0] ? this.mapearPlano(result.rows[0]) : null;
    }

    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async excluir(id: string): Promise<boolean> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query('delete from plano where id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }

    // Metodo mapearPlano: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
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
