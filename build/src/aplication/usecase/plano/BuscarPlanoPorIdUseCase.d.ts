import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';
export declare class BuscarPlanoPorIdUseCase implements UseCase<string, Awaited<ReturnType<PlanoService['buscarPorId']>>> {
    private readonly service;
    execute(id: string): Promise<Awaited<ReturnType<PlanoService['buscarPorId']>>>;
}
//# sourceMappingURL=BuscarPlanoPorIdUseCase.d.ts.map