import { AssinaturaService } from '../../../service/assinatura.servico';
import type { UseCase } from '../UseCase';

type BuscarAssinaturaPorIdInput = { id: string; usuarioId: string };

export class BuscarAssinaturaPorIdUseCase implements UseCase<
    BuscarAssinaturaPorIdInput,
    Awaited<ReturnType<AssinaturaService['buscarPorId']>>
> {
    private readonly service = new AssinaturaService();

    public execute(input: BuscarAssinaturaPorIdInput): Promise<Awaited<ReturnType<AssinaturaService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
