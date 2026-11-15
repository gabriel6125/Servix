import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';

type ExcluirServicoInput = { id: string; usuarioId: string };

export class ExcluirServicoUseCase implements UseCase<ExcluirServicoInput, void> {
    private readonly service = new ServicoService();

    public execute(input: ExcluirServicoInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
