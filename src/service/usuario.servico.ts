import { UsuarioDao } from '../infra/bd/pg/usuario.dao';
import { Usuario } from '../dominio/entidades/usuario';
import { HttpError } from '../util/http-error';
import { createToken } from '../util/jwt';
import { hashPassword, verifyPassword } from '../util/password';

export class UsuarioService {
    private readonly dao = new UsuarioDao();

    public async registrar(usuario: Usuario): Promise<{ usuario: Usuario; token: string }> {
        const usuarioComSenhaHash = Usuario.reconstruir({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email.trim().toLowerCase(),
            senha: await hashPassword(usuario.senha),
        });
        const salvo = await this.dao.salvar(usuarioComSenhaHash);
        return { usuario: salvo, token: createToken(String(salvo.id)) };
    }

    public async autenticar(email: string, senha: string): Promise<{ usuario: Usuario; token: string }> {
        const usuario = await this.dao.buscarPorEmail(email.trim().toLowerCase());
        if (!usuario || !(await verifyPassword(senha, usuario.senha))) {
            throw new HttpError(401, 'E-mail ou senha inválidos.');
        }
        return { usuario, token: createToken(String(usuario.id)) };
    }

    public async buscarPorId(id: string): Promise<Usuario> {
        const usuario = await this.dao.buscarPorId(id);
        if (!usuario) {
            throw new HttpError(404, 'Usuário não encontrado.');
        }
        return usuario;
    }

    public async atualizarPerfil(
        id: string,
        dados: { nome?: string; email?: string; senha?: string },
    ): Promise<Usuario> {
        const atual = await this.buscarPorId(id);
        const atualizado = Usuario.reconstruir({
            id: atual.id,
            nome: dados.nome ?? atual.nome,
            email: dados.email?.trim().toLowerCase() ?? atual.email,
            senha: dados.senha ? await hashPassword(dados.senha) : atual.senha,
        });
        const resultado = await this.dao.atualizar(atualizado);
        if (!resultado) {
            throw new HttpError(404, 'Usuário não encontrado.');
        }
        return resultado;
    }

    public async excluir(id: string): Promise<void> {
        if (!(await this.dao.excluir(id))) {
            throw new HttpError(404, 'Usuário não encontrado.');
        }
    }
}
