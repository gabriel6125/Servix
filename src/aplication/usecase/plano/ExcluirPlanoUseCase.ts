import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';

export class ExcluirPlanoUseCase implements UseCase<string, void> {
    private readonly service = new PlanoService();

    public execute(id: string): Promise<void> {
        return this.service.excluir(id);
    }
}
