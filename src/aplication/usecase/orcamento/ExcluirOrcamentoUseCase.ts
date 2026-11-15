import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';

type ExcluirOrcamentoInput = { id: string; usuarioId: string };

export class ExcluirOrcamentoUseCase implements UseCase<ExcluirOrcamentoInput, void> {
    private readonly service = new OrcamentoService();

    public execute(input: ExcluirOrcamentoInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
