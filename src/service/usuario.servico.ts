import { UsuarioDao } from '../infra/bd/pg/usuario.dao';
import { Usuario } from '../dominio/entidades/usuario';
import { RefreshTokenDao } from '../infra/bd/pg/refresh-token.dao';
import { HttpError } from '../util/http-error';
import { createToken } from '../util/jwt';
import { hashPassword, verifyPassword } from '../util/password';
import {
    createRefreshToken,
    hashRefreshToken,
    REFRESH_TOKEN_TTL_MS,
} from '../util/refresh-token';

// Define o comportamento e os dados desta classe.
export class UsuarioService {
    // Mantem a dependencia dao disponivel para as operacoes da classe.
    private readonly dao = new UsuarioDao();
    // Mantem a dependencia refreshTokenDao disponivel para as operacoes da classe.
    private readonly refreshTokenDao = new RefreshTokenDao();

    // Metodo registrar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async registrar(
        usuario: Usuario,
    ): Promise<{ usuario: Usuario; token: string; refreshToken: string }> {
        const usuarioComSenhaHash = Usuario.reconstruir({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email.trim().toLowerCase(),
            senha: await hashPassword(usuario.senha),
        });
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const salvo = await this.dao.salvar(usuarioComSenhaHash);
        return { usuario: salvo, ...await this.criarSessao(String(salvo.id)) };
    }

    // Metodo autenticar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async autenticar(
        email: string,
        senha: string,
    ): Promise<{ usuario: Usuario; token: string; refreshToken: string }> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const usuario = await this.dao.buscarPorEmail(email.trim().toLowerCase());
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!usuario || !(await verifyPassword(senha, usuario.senha))) {
            throw new HttpError(401, 'E-mail ou senha inválidos.');
        }
        return { usuario, ...await this.criarSessao(String(usuario.id)) };
    }

    // Metodo renovarSessao: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async renovarSessao(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
        const novoRefreshToken = createRefreshToken();
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const usuarioId = await this.refreshTokenDao.rotacionar(
            hashRefreshToken(refreshToken),
            hashRefreshToken(novoRefreshToken),
            new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        );
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!usuarioId) {
            throw new HttpError(401, 'Refresh token inválido, expirado ou já utilizado.');
        }
        return { token: createToken(usuarioId), refreshToken: novoRefreshToken };
    }

    // Metodo revogarSessao: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async revogarSessao(refreshToken: string): Promise<void> {
        await this.refreshTokenDao.revogar(hashRefreshToken(refreshToken));
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(id: string): Promise<Usuario> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const usuario = await this.dao.buscarPorId(id);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!usuario) {
            throw new HttpError(404, 'Usuário não encontrado.');
        }
        return usuario;
    }

    public async atualizarPerfil(
        id: string,
        dados: { nome?: string; email?: string; senha?: string },
    ): Promise<Usuario> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atual = await this.buscarPorId(id);
        const atualizado = Usuario.reconstruir({
            id: atual.id,
            nome: dados.nome ?? atual.nome,
            email: dados.email?.trim().toLowerCase() ?? atual.email,
            senha: dados.senha ? await hashPassword(dados.senha) : atual.senha,
        });
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const resultado = await this.dao.atualizar(atualizado);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!resultado) {
            throw new HttpError(404, 'Usuário não encontrado.');
        }
        return resultado;
    }

    // Metodo criarSessao: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    private async criarSessao(usuarioId: string): Promise<{ token: string; refreshToken: string }> {
        const token = createToken(usuarioId);
        const refreshToken = createRefreshToken();
        await this.refreshTokenDao.salvar(
            usuarioId,
            hashRefreshToken(refreshToken),
            new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        );
        return { token, refreshToken };
    }

    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async excluir(id: string): Promise<void> {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.excluir(id))) {
            throw new HttpError(404, 'Usuário não encontrado.');
        }
    }
}
