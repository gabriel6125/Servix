import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';

type BuscarDespesaPorIdInput = { id: string; usuarioId: string };

export class BuscarDespesaPorIdUseCase implements UseCase<
    BuscarDespesaPorIdInput,
    Awaited<ReturnType<DespesaService['buscarPorId']>>
> {
    private readonly service = new DespesaService();

    public execute(input: BuscarDespesaPorIdInput): Promise<Awaited<ReturnType<DespesaService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
