import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';

type ExcluirDespesaInput = { id: string; usuarioId: string };

export class ExcluirDespesaUseCase implements UseCase<ExcluirDespesaInput, void> {
    private readonly service = new DespesaService();

    public execute(input: ExcluirDespesaInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
