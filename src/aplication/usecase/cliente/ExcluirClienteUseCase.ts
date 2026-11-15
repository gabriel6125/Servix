import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';

type ExcluirClienteInput = { id: string; usuarioId: string };

export class ExcluirClienteUseCase implements UseCase<ExcluirClienteInput, void> {
    private readonly service = new ClienteService();

    public execute(input: ExcluirClienteInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
