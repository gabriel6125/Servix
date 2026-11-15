import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';

export class ListarServicosUseCase implements UseCase<string, Awaited<ReturnType<ServicoService['listar']>>> {
    private readonly service = new ServicoService();

    public execute(usuarioId: string): Promise<Awaited<ReturnType<ServicoService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
