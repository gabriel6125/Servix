import { Pagamento } from '../../../dominio/entidades/pagamento';
export declare class PagamentoDao {
    salvar(pagamento: Pagamento, usuarioId: string): Promise<Pagamento | null>;
    buscarPorId(id: string, usuarioId: string): Promise<Pagamento | null>;
    listar(usuarioId: string): Promise<Pagamento[]>;
    atualizar(pagamento: Pagamento, usuarioId: string): Promise<Pagamento | null>;
    excluir(id: string, usuarioId: string): Promise<boolean>;
    private mapearPagamento;
}
//# sourceMappingURL=pagamento.dao.d.ts.map