import { AssinaturaService } from '../../../service/assinatura.servico';
import type { UseCase } from '../UseCase';

type ExcluirAssinaturaInput = { id: string; usuarioId: string };

export class ExcluirAssinaturaUseCase implements UseCase<ExcluirAssinaturaInput, void> {
    private readonly service = new AssinaturaService();

    public execute(input: ExcluirAssinaturaInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
