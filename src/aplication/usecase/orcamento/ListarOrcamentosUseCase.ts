import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';

export class ListarOrcamentosUseCase implements UseCase<string, Awaited<ReturnType<OrcamentoService['listar']>>> {
    private readonly service = new OrcamentoService();

    public execute(usuarioId: string): Promise<Awaited<ReturnType<OrcamentoService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
