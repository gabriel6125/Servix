import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';
type BuscarDespesaPorIdInput = {
    id: string;
    usuarioId: string;
};
export declare class BuscarDespesaPorIdUseCase implements UseCase<BuscarDespesaPorIdInput, Awaited<ReturnType<DespesaService['buscarPorId']>>> {
    private readonly service;
    execute(input: BuscarDespesaPorIdInput): Promise<Awaited<ReturnType<DespesaService['buscarPorId']>>>;
}
export {};
//# sourceMappingURL=BuscarDespesaPorIdUseCase.d.ts.map