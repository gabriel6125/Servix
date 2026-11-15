import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';

type BuscarClientePorIdInput = { id: string; usuarioId: string };

export class BuscarClientePorIdUseCase implements UseCase<
    BuscarClientePorIdInput,
    Awaited<ReturnType<ClienteService['buscarPorId']>>
> {
    private readonly service = new ClienteService();

    public execute(input: BuscarClientePorIdInput): Promise<Awaited<ReturnType<ClienteService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
