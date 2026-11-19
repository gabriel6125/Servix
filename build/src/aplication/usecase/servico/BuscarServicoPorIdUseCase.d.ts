import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';
type BuscarServicoPorIdInput = {
    id: string;
    usuarioId: string;
};
export declare class BuscarServicoPorIdUseCase implements UseCase<BuscarServicoPorIdInput, Awaited<ReturnType<ServicoService['buscarPorId']>>> {
    private readonly service;
    execute(input: BuscarServicoPorIdInput): Promise<Awaited<ReturnType<ServicoService['buscarPorId']>>>;
}
export {};
//# sourceMappingURL=BuscarServicoPorIdUseCase.d.ts.map