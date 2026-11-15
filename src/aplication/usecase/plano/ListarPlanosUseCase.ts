import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';

export class ListarPlanosUseCase implements UseCase<void, Awaited<ReturnType<PlanoService['listar']>>> {
    private readonly service = new PlanoService();

    public execute(): Promise<Awaited<ReturnType<PlanoService['listar']>>> {
        return this.service.listar();
    }
}
