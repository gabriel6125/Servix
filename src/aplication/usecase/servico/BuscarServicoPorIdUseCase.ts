import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';

type BuscarServicoPorIdInput = { id: string; usuarioId: string };

export class BuscarServicoPorIdUseCase implements UseCase<
    BuscarServicoPorIdInput,
    Awaited<ReturnType<ServicoService['buscarPorId']>>
> {
    private readonly service = new ServicoService();

    public execute(input: BuscarServicoPorIdInput): Promise<Awaited<ReturnType<ServicoService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
