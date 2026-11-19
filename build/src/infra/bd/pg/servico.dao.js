import { connection } from '../../../util/connection';
import { Servico } from '../../../dominio/entidades/servico';
// Define o comportamento e os dados desta classe.
export class ServicoDao {
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(servico) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`insert into servico
                (cliente_id, usuario_id, descricao, status, data_prevista, data_conclusao)
             values ($1, $2, $3, $4, $5, $6)
             returning id, cliente_id, usuario_id, descricao, status, data_prevista, data_conclusao`, [
            servico.clienteId,
            servico.usuarioId,
            servico.descricao,
            servico.status,
            servico.dataPrevista,
            servico.dataConclusao,
        ]);
        return this.mapearServico(result.rows[0]);
    }
    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarPorId(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`select id, cliente_id, usuario_id, descricao, status, data_prevista, data_conclusao
             from servico where id = $1 and usuario_id = $2`, [id, usuarioId]);
        return result.rows[0] ? this.mapearServico(result.rows[0]) : null;
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async listar(usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`select id, cliente_id, usuario_id, descricao, status, data_prevista, data_conclusao
             from servico where usuario_id = $1 order by id`, [usuarioId]);
        return result.rows.map((row) => this.mapearServico(row));
    }
    async listarPorCliente(clienteId, usuarioId) {
        const result = await connection.query(`select id, cliente_id, usuario_id, descricao, status, data_prevista, data_conclusao
             from servico
             where usuario_id = $1 and cliente_id = $2
             order by id`, [usuarioId, clienteId]);
        return result.rows.map((row) => this.mapearServico(row));
    }
    async listarAlertasPrazo(usuarioId) {
        const result = await connection.query(`select id, cliente_id, usuario_id, descricao, status, data_prevista, data_conclusao
             from servico
             where usuario_id = $1
               and data_prevista is not null
               and data_conclusao is null
               and data_prevista <= (CURRENT_DATE + interval '3 days')::date
               and lower(status) not in ('concluido', 'cancelado')
             order by data_prevista`, [usuarioId]);
        return result.rows.map((row) => this.mapearServico(row));
    }
    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async atualizar(servico) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`update servico
             set cliente_id = $1, descricao = $2, status = $3,
                 data_prevista = $4, data_conclusao = $5
             where id = $6 and usuario_id = $7
             returning id, cliente_id, usuario_id, descricao, status, data_prevista, data_conclusao`, [
            servico.clienteId,
            servico.descricao,
            servico.status,
            servico.dataPrevista,
            servico.dataConclusao,
            servico.id,
            servico.usuarioId,
        ]);
        return result.rows[0] ? this.mapearServico(result.rows[0]) : null;
    }
    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async excluir(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query('delete from servico where id = $1 and usuario_id = $2', [id, usuarioId]);
        return (result.rowCount ?? 0) > 0;
    }
    // Metodo clientePertenceAoUsuario: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async clientePertenceAoUsuario(clienteId, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query('select 1 from cliente where id = $1 and usuario_id = $2', [clienteId, usuarioId]);
        return (result.rowCount ?? 0) > 0;
    }
    // Metodo mapearServico: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    mapearServico(row) {
        const props = {
            id: String(row.id),
            clienteId: String(row.cliente_id),
            usuarioId: String(row.usuario_id),
            descricao: String(row.descricao),
            status: String(row.status),
            dataPrevista: row.data_prevista === null ? null : String(row.data_prevista),
            dataConclusao: row.data_conclusao === null ? null : String(row.data_conclusao),
        };
        return Servico.reconstruir(props);
    }
}
//# sourceMappingURL=servico.dao.js.map