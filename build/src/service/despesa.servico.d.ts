import { Despesa } from '../dominio/entidades/despesa';
export declare class DespesaService {
    private readonly dao;
    salvar(despesa: Despesa): Promise<Despesa>;
    listar(usuarioId: string): Promise<Despesa[]>;
    buscarPorId(id: string, usuarioId: string): Promise<Despesa>;
    atualizar(despesa: Despesa): Promise<Despesa>;
    excluir(id: string, usuarioId: string): Promise<void>;
}
//# sourceMappingURL=despesa.servico.d.ts.map