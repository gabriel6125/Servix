import { Despesa } from '../../../dominio/entidades/despesa';
export declare class DespesaDao {
    salvar(despesa: Despesa): Promise<Despesa>;
    buscarPorId(id: string, usuarioId: string): Promise<Despesa | null>;
    listar(usuarioId: string): Promise<Despesa[]>;
    atualizar(despesa: Despesa): Promise<Despesa | null>;
    excluir(id: string, usuarioId: string): Promise<boolean>;
    private mapearDespesa;
}
//# sourceMappingURL=despesa.dao.d.ts.map