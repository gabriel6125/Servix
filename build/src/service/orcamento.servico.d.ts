import { Orcamento } from '../dominio/entidades/orcamento';
export declare class OrcamentoService {
    private readonly dao;
    private readonly servicoDao;
    salvar(orcamento: Orcamento, usuarioId: string): Promise<Orcamento>;
    listar(usuarioId: string): Promise<Orcamento[]>;
    buscarPorId(id: string, usuarioId: string): Promise<Orcamento>;
    atualizar(orcamento: Orcamento, usuarioId: string): Promise<Orcamento>;
    excluir(id: string, usuarioId: string): Promise<void>;
    private validarServico;
}
//# sourceMappingURL=orcamento.servico.d.ts.map