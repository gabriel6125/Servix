import { Plano } from '../dominio/entidades/plano';
export declare class PlanoService {
    private readonly dao;
    salvar(plano: Plano): Promise<Plano>;
    listar(): Promise<Plano[]>;
    buscarPorId(id: string): Promise<Plano>;
    atualizar(plano: Plano): Promise<Plano>;
    excluir(id: string): Promise<void>;
}
//# sourceMappingURL=plano.servico.d.ts.map