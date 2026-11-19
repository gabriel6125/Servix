import { Usuario } from '../../../dominio/entidades/usuario';
export declare class UsuarioDao {
    salvar(usuario: Usuario): Promise<Usuario>;
    buscarPorId(id: string): Promise<Usuario | null>;
    buscarPorEmail(email: string): Promise<Usuario | null>;
    listar(): Promise<Usuario[]>;
    atualizar(usuario: Usuario): Promise<Usuario | null>;
    excluir(id: string): Promise<boolean>;
    private mapearUsuario;
}
//# sourceMappingURL=usuario.dao.d.ts.map