import { Plano } from '../../../dominio/entidades/plano';
export declare class PlanoDao {
    salvar(plano: Plano): Promise<Plano>;
    buscarPorId(id: string): Promise<Plano | null>;
    listar(): Promise<Plano[]>;
    atualizar(plano: Plano): Promise<Plano | null>;
    excluir(id: string): Promise<boolean>;
    private mapearPlano;
}
//# sourceMappingURL=plano.dao.d.ts.map