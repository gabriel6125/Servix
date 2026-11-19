import { connection } from '../../../util/connection';
import { Usuario } from '../../../dominio/entidades/usuario';
// Define o comportamento e os dados desta classe.
export class UsuarioDao {
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(usuario) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`insert into usuario (nome, email, senha)
             values ($1, $2, $3)
             returning id, nome, email, senha`, [usuario.nome, usuario.email, usuario.senha]);
        return this.mapearUsuario(result.rows[0]);
    }
    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarPorId(id) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query('select id, nome, email, senha from usuario where id = $1', [id]);
        return result.rows[0] ? this.mapearUsuario(result.rows[0]) : null;
    }
    // Metodo buscarPorEmail: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarPorEmail(email) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query('select id, nome, email, senha from usuario where email = $1', [email]);
        return result.rows[0] ? this.mapearUsuario(result.rows[0]) : null;
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async listar() {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query('select id, nome, email, senha from usuario order by id');
        return result.rows.map((row) => this.mapearUsuario(row));
    }
    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async atualizar(usuario) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`update usuario
             set nome = $1, email = $2, senha = $3
             where id = $4
             returning id, nome, email, senha`, [usuario.nome, usuario.email, usuario.senha, usuario.id]);
        return result.rows[0] ? this.mapearUsuario(result.rows[0]) : null;
    }
    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async excluir(id) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query('delete from usuario where id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
    // Metodo mapearUsuario: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    mapearUsuario(row) {
        const props = {
            id: String(row.id),
            nome: String(row.nome),
            email: String(row.email),
            senha: String(row.senha),
        };
        return Usuario.reconstruir(props);
    }
}
//# sourceMappingURL=usuario.dao.js.map