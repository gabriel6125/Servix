import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';
export declare class ListarDespesasUseCase implements UseCase<string, Awaited<ReturnType<DespesaService['listar']>>> {
    private readonly service;
    execute(usuarioId: string): Promise<Awaited<ReturnType<DespesaService['listar']>>>;
}
//# sourceMappingURL=ListarDespesasUseCase.d.ts.map