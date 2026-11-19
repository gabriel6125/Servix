import { Servico } from '../dominio/entidades/servico';
export declare class ServicoService {
    private readonly dao;
    private readonly clienteDao;
    salvar(servico: Servico): Promise<Servico>;
    listar(usuarioId: string): Promise<Servico[]>;
    listarPorCliente(clienteId: string, usuarioId: string): Promise<Servico[]>;
    listarAlertasPrazo(usuarioId: string): Promise<Servico[]>;
    buscarPorId(id: string, usuarioId: string): Promise<Servico>;
    atualizar(servico: Servico): Promise<Servico>;
    excluir(id: string, usuarioId: string): Promise<void>;
    private validarCliente;
}
//# sourceMappingURL=servico.servico.d.ts.map