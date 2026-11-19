import { Servico } from '../../../dominio/entidades/servico';
export declare class ServicoDao {
    salvar(servico: Servico): Promise<Servico>;
    buscarPorId(id: string, usuarioId: string): Promise<Servico | null>;
    listar(usuarioId: string): Promise<Servico[]>;
    listarPorCliente(clienteId: string, usuarioId: string): Promise<Servico[]>;
    listarAlertasPrazo(usuarioId: string): Promise<Servico[]>;
    atualizar(servico: Servico): Promise<Servico | null>;
    excluir(id: string, usuarioId: string): Promise<boolean>;
    clientePertenceAoUsuario(clienteId: string, usuarioId: string): Promise<boolean>;
    private mapearServico;
}
//# sourceMappingURL=servico.dao.d.ts.map