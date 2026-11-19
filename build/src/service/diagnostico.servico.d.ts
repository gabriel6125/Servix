import { Diagnostico } from '../dominio/entidades/diagnostico';
export declare class DiagnosticoService {
    private readonly dao;
    private readonly servicoDao;
    salvar(diagnostico: Diagnostico, usuarioId: string): Promise<Diagnostico>;
    listar(usuarioId: string): Promise<Diagnostico[]>;
    buscarPorId(id: string, usuarioId: string): Promise<Diagnostico>;
    atualizar(diagnostico: Diagnostico, usuarioId: string): Promise<Diagnostico>;
    excluir(id: string, usuarioId: string): Promise<void>;
    private validarServico;
}
//# sourceMappingURL=diagnostico.servico.d.ts.map