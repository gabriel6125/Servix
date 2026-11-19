import { Assinatura } from '../../../dominio/entidades/assinatura';
export declare class AssinaturaDao {
    salvar(assinatura: Assinatura): Promise<Assinatura>;
    buscarPorId(id: string, usuarioId: string): Promise<Assinatura | null>;
    listar(usuarioId: string): Promise<Assinatura[]>;
    atualizar(assinatura: Assinatura): Promise<Assinatura | null>;
    excluir(id: string, usuarioId: string): Promise<boolean>;
    planoExiste(planoId: string): Promise<boolean>;
    private mapearAssinatura;
}
//# sourceMappingURL=assinatura.dao.d.ts.map