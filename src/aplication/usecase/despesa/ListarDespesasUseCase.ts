import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';

export class ListarDespesasUseCase implements UseCase<string, Awaited<ReturnType<DespesaService['listar']>>> {
    private readonly service = new DespesaService();

    public execute(usuarioId: string): Promise<Awaited<ReturnType<DespesaService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
