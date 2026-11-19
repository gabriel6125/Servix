import { connection } from '../../../util/connection';
import { Cliente } from '../../../dominio/entidades/cliente';
// Define o comportamento e os dados desta classe.
export class ClienteDao {
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(cliente) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`insert into cliente (usuario_id, nome, telefone, email)
             values ($1, $2, $3, $4)
             returning id, usuario_id, nome, telefone, email`, [cliente.usuarioId, cliente.nome, cliente.telefone, cliente.email]);
        return this.mapearCliente(result.rows[0]);
    }
    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarPorId(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`select id, usuario_id, nome, telefone, email
             from cliente where id = $1 and usuario_id = $2`, [id, usuarioId]);
        return result.rows[0] ? this.mapearCliente(result.rows[0]) : null;
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async listar(usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`select id, usuario_id, nome, telefone, email
             from cliente where usuario_id = $1 order by id`, [usuarioId]);
        return result.rows.map((row) => this.mapearCliente(row));
    }
    async buscarPorNome(nome, usuarioId) {
        const result = await connection.query(`select id, usuario_id, nome, telefone, email
             from cliente
             where usuario_id = $1 and nome ilike $2
             order by nome`, [usuarioId, `%${nome}%`]);
        return result.rows.map((row) => this.mapearCliente(row));
    }
    async listarPorServico(servicoId, usuarioId) {
        const result = await connection.query(`select c.id, c.usuario_id, c.nome, c.telefone, c.email
             from cliente c
             inner join servico s on s.cliente_id = c.id
             where c.usuario_id = $1 and s.id = $2
             order by c.nome`, [usuarioId, servicoId]);
        return result.rows.map((row) => this.mapearCliente(row));
    }
    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async atualizar(cliente) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`update cliente
             set nome = $1, telefone = $2, email = $3
             where id = $4 and usuario_id = $5
             returning id, usuario_id, nome, telefone, email`, [cliente.nome, cliente.telefone, cliente.email, cliente.id, cliente.usuarioId]);
        return result.rows[0] ? this.mapearCliente(result.rows[0]) : null;
    }
    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async excluir(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query('delete from cliente where id = $1 and usuario_id = $2', [id, usuarioId]);
        return (result.rowCount ?? 0) > 0;
    }
    // Metodo mapearCliente: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    mapearCliente(row) {
        const props = {
            id: String(row.id),
            usuarioId: String(row.usuario_id),
            nome: String(row.nome),
            telefone: row.telefone === null ? null : String(row.telefone),
            email: row.email === null ? null : String(row.email),
        };
        return Cliente.reconstruir(props);
    }
}
//# sourceMappingURL=cliente.dao.js.map