import { Cliente } from '../../../dominio/entidades/cliente';
export declare class ClienteDao {
    salvar(cliente: Cliente): Promise<Cliente>;
    buscarPorId(id: string, usuarioId: string): Promise<Cliente | null>;
    listar(usuarioId: string): Promise<Cliente[]>;
    buscarPorNome(nome: string, usuarioId: string): Promise<Cliente[]>;
    listarPorServico(servicoId: string, usuarioId: string): Promise<Cliente[]>;
    atualizar(cliente: Cliente): Promise<Cliente | null>;
    excluir(id: string, usuarioId: string): Promise<boolean>;
    private mapearCliente;
}
//# sourceMappingURL=cliente.dao.d.ts.map