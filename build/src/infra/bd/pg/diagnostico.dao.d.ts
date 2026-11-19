import { Diagnostico } from '../../../dominio/entidades/diagnostico';
export declare class DiagnosticoDao {
    salvar(diagnostico: Diagnostico, usuarioId: string): Promise<Diagnostico | null>;
    buscarPorId(id: string, usuarioId: string): Promise<Diagnostico | null>;
    listar(usuarioId: string): Promise<Diagnostico[]>;
    atualizar(diagnostico: Diagnostico, usuarioId: string): Promise<Diagnostico | null>;
    excluir(id: string, usuarioId: string): Promise<boolean>;
    private mapearDiagnostico;
}
//# sourceMappingURL=diagnostico.dao.d.ts.map