import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';

export class ListarClientesUseCase implements UseCase<string, Awaited<ReturnType<ClienteService['listar']>>> {
    private readonly service = new ClienteService();

    public execute(usuarioId: string): Promise<Awaited<ReturnType<ClienteService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
