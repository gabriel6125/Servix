import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';
export declare class ListarServicosUseCase implements UseCase<string, Awaited<ReturnType<ServicoService['listar']>>> {
    private readonly service;
    execute(usuarioId: string): Promise<Awaited<ReturnType<ServicoService['listar']>>>;
}
//# sourceMappingURL=ListarServicosUseCase.d.ts.map