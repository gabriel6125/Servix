import { connection } from '../../../util/connection';
import { Cliente, type propsCliente } from '../../../dominio/entidades/cliente';

export class ClienteDao {
    public async salvar(cliente: Cliente): Promise<Cliente> {
        const result = await connection.query(
            `insert into cliente (usuario_id, nome, telefone, email)
             values ($1, $2, $3, $4)
             returning id, usuario_id, nome, telefone, email`,
            [cliente.usuarioId, cliente.nome, cliente.telefone, cliente.email],
        );
        return this.mapearCliente(result.rows[0]);
    }

    public async buscarPorId(id: string, usuarioId: string): Promise<Cliente | null> {
        const result = await connection.query(
            `select id, usuario_id, nome, telefone, email
             from cliente where id = $1 and usuario_id = $2`,
            [id, usuarioId],
        );
        return result.rows[0] ? this.mapearCliente(result.rows[0]) : null;
    }

    public async listar(usuarioId: string): Promise<Cliente[]> {
        const result = await connection.query(
            `select id, usuario_id, nome, telefone, email
             from cliente where usuario_id = $1 order by id`,
            [usuarioId],
        );
        return result.rows.map((row) => this.mapearCliente(row));
    }

    public async atualizar(cliente: Cliente): Promise<Cliente | null> {
        const result = await connection.query(
            `update cliente
             set nome = $1, telefone = $2, email = $3
             where id = $4 and usuario_id = $5
             returning id, usuario_id, nome, telefone, email`,
            [cliente.nome, cliente.telefone, cliente.email, cliente.id, cliente.usuarioId],
        );
        return result.rows[0] ? this.mapearCliente(result.rows[0]) : null;
    }

    public async excluir(id: string, usuarioId: string): Promise<boolean> {
        const result = await connection.query(
            'delete from cliente where id = $1 and usuario_id = $2',
            [id, usuarioId],
        );
        return (result.rowCount ?? 0) > 0;
    }

    private mapearCliente(row: Record<string, unknown>): Cliente {
        const props: propsCliente = {
            id: String(row.id),
            usuarioId: String(row.usuario_id),
            nome: String(row.nome),
            telefone: row.telefone === null ? null : String(row.telefone),
            email: row.email === null ? null : String(row.email),
        };
        return Cliente.reconstruir(props);
    }
}
