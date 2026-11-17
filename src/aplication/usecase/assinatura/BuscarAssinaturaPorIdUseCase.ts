import { AssinaturaService } from '../../../service/assinatura.servico';
import type { UseCase } from '../UseCase';

type BuscarAssinaturaPorIdInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class BuscarAssinaturaPorIdUseCase implements UseCase<
    BuscarAssinaturaPorIdInput,
    Awaited<ReturnType<AssinaturaService['buscarPorId']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new AssinaturaService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: BuscarAssinaturaPorIdInput): Promise<Awaited<ReturnType<AssinaturaService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
