import { Assinatura } from '../dominio/entidades/assinatura';
export declare class AssinaturaService {
    private readonly dao;
    salvar(assinatura: Assinatura): Promise<Assinatura>;
    listar(usuarioId: string): Promise<Assinatura[]>;
    buscarPorId(id: string, usuarioId: string): Promise<Assinatura>;
    atualizar(assinatura: Assinatura): Promise<Assinatura>;
    excluir(id: string, usuarioId: string): Promise<void>;
}
//# sourceMappingURL=assinatura.servico.d.ts.map