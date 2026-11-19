import { Usuario } from '../dominio/entidades/usuario';
export declare class UsuarioService {
    private readonly dao;
    private readonly refreshTokenDao;
    registrar(usuario: Usuario): Promise<{
        usuario: Usuario;
        token: string;
        refreshToken: string;
    }>;
    autenticar(email: string, senha: string): Promise<{
        usuario: Usuario;
        token: string;
        refreshToken: string;
    }>;
    renovarSessao(refreshToken: string): Promise<{
        token: string;
        refreshToken: string;
    }>;
    revogarSessao(refreshToken: string): Promise<void>;
    buscarPorId(id: string): Promise<Usuario>;
    atualizarPerfil(id: string, dados: {
        nome?: string;
        email?: string;
        senha?: string;
    }): Promise<Usuario>;
    solicitarRecuperacaoSenha(email: string): Promise<{
        resetToken: string;
    } | {
        message: string;
    }>;
    redefinirSenha(token: string, novaSenha: string): Promise<void>;
    private criarSessao;
    excluir(id: string): Promise<void>;
}
//# sourceMappingURL=usuario.servico.d.ts.map