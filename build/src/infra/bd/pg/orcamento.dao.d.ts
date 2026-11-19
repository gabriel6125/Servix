import { Orcamento } from '../../../dominio/entidades/orcamento';
export declare class OrcamentoDao {
    salvar(orcamento: Orcamento, usuarioId: string): Promise<Orcamento | null>;
    buscarPorId(id: string, usuarioId: string): Promise<Orcamento | null>;
    listar(usuarioId: string): Promise<Orcamento[]>;
    atualizar(orcamento: Orcamento, usuarioId: string): Promise<Orcamento | null>;
    excluir(id: string, usuarioId: string): Promise<boolean>;
    private mapearOrcamento;
}
//# sourceMappingURL=orcamento.dao.d.ts.map