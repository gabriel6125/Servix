import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';
export declare class ListarPlanosUseCase implements UseCase<void, Awaited<ReturnType<PlanoService['listar']>>> {
    private readonly service;
    execute(): Promise<Awaited<ReturnType<PlanoService['listar']>>>;
}
//# sourceMappingURL=ListarPlanosUseCase.d.ts.map