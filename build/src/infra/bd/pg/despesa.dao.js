import { connection } from '../../../util/connection';
import { Despesa } from '../../../dominio/entidades/despesa';
// Define o comportamento e os dados desta classe.
export class DespesaDao {
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(despesa) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`insert into despesa (usuario_id, descricao, valor, data_despesa)
             values ($1, $2, $3, $4)
             returning id, usuario_id, descricao, valor, data_despesa`, [despesa.usuarioId, despesa.descricao, despesa.valor, despesa.dataDespesa]);
        return this.mapearDespesa(result.rows[0]);
    }
    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarPorId(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`select id, usuario_id, descricao, valor, data_despesa
             from despesa where id = $1 and usuario_id = $2`, [id, usuarioId]);
        return result.rows[0] ? this.mapearDespesa(result.rows[0]) : null;
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async listar(usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`select id, usuario_id, descricao, valor, data_despesa
             from despesa where usuario_id = $1 order by id`, [usuarioId]);
        return result.rows.map((row) => this.mapearDespesa(row));
    }
    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async atualizar(despesa) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`update despesa
             set descricao = $1, valor = $2, data_despesa = $3
             where id = $4 and usuario_id = $5
             returning id, usuario_id, descricao, valor, data_despesa`, [despesa.descricao, despesa.valor, despesa.dataDespesa, despesa.id, despesa.usuarioId]);
        return result.rows[0] ? this.mapearDespesa(result.rows[0]) : null;
    }
    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async excluir(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query('delete from despesa where id = $1 and usuario_id = $2', [id, usuarioId]);
        return (result.rowCount ?? 0) > 0;
    }
    // Metodo mapearDespesa: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    mapearDespesa(row) {
        const props = {
            id: String(row.id),
            usuarioId: String(row.usuario_id),
            descricao: String(row.descricao),
            valor: Number(row.valor),
            dataDespesa: String(row.data_despesa),
        };
        return Despesa.reconstruir(props);
    }
}
//# sourceMappingURL=despesa.dao.js.map