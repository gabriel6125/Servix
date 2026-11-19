import { Cliente } from '../dominio/entidades/cliente';
export declare class ClienteService {
    private readonly dao;
    salvar(cliente: Cliente): Promise<Cliente>;
    listar(usuarioId: string): Promise<Cliente[]>;
    buscarPorNome(nome: string, usuarioId: string): Promise<Cliente[]>;
    listarPorServico(servicoId: string, usuarioId: string): Promise<Cliente[]>;
    buscarPorId(id: string, usuarioId: string): Promise<Cliente>;
    atualizar(cliente: Cliente): Promise<Cliente>;
    excluir(id: string, usuarioId: string): Promise<void>;
}
//# sourceMappingURL=cliente.servico.d.ts.map