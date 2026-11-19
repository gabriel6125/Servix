import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';
export declare class ListarOrcamentosUseCase implements UseCase<string, Awaited<ReturnType<OrcamentoService['listar']>>> {
    private readonly service;
    execute(usuarioId: string): Promise<Awaited<ReturnType<OrcamentoService['listar']>>>;
}
//# sourceMappingURL=ListarOrcamentosUseCase.d.ts.map