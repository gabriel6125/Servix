import { connection } from '../../../util/connection';
import { Usuario, type propsUsuario } from '../../../dominio/entidades/usuario';

export class UsuarioDao {
    public async salvar(usuario: Usuario): Promise<Usuario> {
        const result = await connection.query(
            `insert into usuario (nome, email, senha)
             values ($1, $2, $3)
             returning id, nome, email, senha`,
            [usuario.nome, usuario.email, usuario.senha],
        );
        return this.mapearUsuario(result.rows[0]);
    }

    public async buscarPorId(id: string): Promise<Usuario | null> {
        const result = await connection.query(
            'select id, nome, email, senha from usuario where id = $1',
            [id],
        );
        return result.rows[0] ? this.mapearUsuario(result.rows[0]) : null;
    }

    public async buscarPorEmail(email: string): Promise<Usuario | null> {
        const result = await connection.query(
            'select id, nome, email, senha from usuario where email = $1',
            [email],
        );
        return result.rows[0] ? this.mapearUsuario(result.rows[0]) : null;
    }

    public async listar(): Promise<Usuario[]> {
        const result = await connection.query('select id, nome, email, senha from usuario order by id');
        return result.rows.map((row) => this.mapearUsuario(row));
    }

    public async atualizar(usuario: Usuario): Promise<Usuario | null> {
        const result = await connection.query(
            `update usuario
             set nome = $1, email = $2, senha = $3
             where id = $4
             returning id, nome, email, senha`,
            [usuario.nome, usuario.email, usuario.senha, usuario.id],
        );
        return result.rows[0] ? this.mapearUsuario(result.rows[0]) : null;
    }

    public async excluir(id: string): Promise<boolean> {
        const result = await connection.query('delete from usuario where id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }

    private mapearUsuario(row: Record<string, unknown>): Usuario {
        const props: propsUsuario = {
            id: String(row.id),
            nome: String(row.nome),
            email: String(row.email),
            senha: String(row.senha),
        };
        return Usuario.reconstruir(props);
    }
}
