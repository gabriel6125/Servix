import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';

export class BuscarPlanoPorIdUseCase implements UseCase<string, Awaited<ReturnType<PlanoService['buscarPorId']>>> {
    private readonly service = new PlanoService();

    public execute(id: string): Promise<Awaited<ReturnType<PlanoService['buscarPorId']>>> {
        return this.service.buscarPorId(id);
    }
}
