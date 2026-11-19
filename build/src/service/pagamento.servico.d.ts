import { Pagamento } from '../dominio/entidades/pagamento';
export declare class PagamentoService {
    private readonly dao;
    private readonly servicoDao;
    salvar(pagamento: Pagamento, usuarioId: string): Promise<Pagamento>;
    listar(usuarioId: string): Promise<Pagamento[]>;
    buscarPorId(id: string, usuarioId: string): Promise<Pagamento>;
    atualizar(pagamento: Pagamento, usuarioId: string): Promise<Pagamento>;
    excluir(id: string, usuarioId: string): Promise<void>;
    private validarServico;
}
//# sourceMappingURL=pagamento.servico.d.ts.map