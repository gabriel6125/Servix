import { AssinaturaService } from '../../../service/assinatura.servico';
import type { UseCase } from '../UseCase';

export class ListarAssinaturasUseCase implements UseCase<string, Awaited<ReturnType<AssinaturaService['listar']>>> {
    private readonly service = new AssinaturaService();

    public execute(usuarioId: string): Promise<Awaited<ReturnType<AssinaturaService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
