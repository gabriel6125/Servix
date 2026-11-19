import { connection } from '../../../util/connection';
import { Assinatura } from '../../../dominio/entidades/assinatura';
// Define o comportamento e os dados desta classe.
export class AssinaturaDao {
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(assinatura) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`insert into assinatura (usuario_id, plano_id, status, data_inicio, data_fim)
             values ($1, $2, $3, $4, $5)
             returning id, usuario_id, plano_id, status, data_inicio, data_fim`, [
            assinatura.usuarioId,
            assinatura.planoId,
            assinatura.status,
            assinatura.dataInicio,
            assinatura.dataFim,
        ]);
        return this.mapearAssinatura(result.rows[0]);
    }
    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarPorId(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`select id, usuario_id, plano_id, status, data_inicio, data_fim
             from assinatura where id = $1 and usuario_id = $2`, [id, usuarioId]);
        return result.rows[0] ? this.mapearAssinatura(result.rows[0]) : null;
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async listar(usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`select id, usuario_id, plano_id, status, data_inicio, data_fim
             from assinatura where usuario_id = $1 order by id`, [usuarioId]);
        return result.rows.map((row) => this.mapearAssinatura(row));
    }
    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async atualizar(assinatura) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`update assinatura
             set plano_id = $1, status = $2, data_inicio = $3, data_fim = $4
             where id = $5 and usuario_id = $6
             returning id, usuario_id, plano_id, status, data_inicio, data_fim`, [
            assinatura.planoId,
            assinatura.status,
            assinatura.dataInicio,
            assinatura.dataFim,
            assinatura.id,
            assinatura.usuarioId,
        ]);
        return result.rows[0] ? this.mapearAssinatura(result.rows[0]) : null;
    }
    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async excluir(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query('delete from assinatura where id = $1 and usuario_id = $2', [id, usuarioId]);
        return (result.rowCount ?? 0) > 0;
    }
    // Metodo planoExiste: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async planoExiste(planoId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query('select 1 from plano where id = $1', [planoId]);
        return (result.rowCount ?? 0) > 0;
    }
    // Metodo mapearAssinatura: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    mapearAssinatura(row) {
        const props = {
            id: String(row.id),
            usuarioId: String(row.usuario_id),
            planoId: String(row.plano_id),
            status: String(row.status),
            dataInicio: String(row.data_inicio),
            dataFim: row.data_fim === null ? null : String(row.data_fim),
        };
        return Assinatura.reconstruir(props);
    }
}
//# sourceMappingURL=assinatura.dao.js.map