import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';

type BuscarOrcamentoPorIdInput = { id: string; usuarioId: string };

export class BuscarOrcamentoPorIdUseCase implements UseCase<
    BuscarOrcamentoPorIdInput,
    Awaited<ReturnType<OrcamentoService['buscarPorId']>>
> {
    private readonly service = new OrcamentoService();

    public execute(input: BuscarOrcamentoPorIdInput): Promise<Awaited<ReturnType<OrcamentoService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
