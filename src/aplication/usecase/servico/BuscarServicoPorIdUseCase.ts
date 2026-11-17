import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';

type BuscarServicoPorIdInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class BuscarServicoPorIdUseCase implements UseCase<
    BuscarServicoPorIdInput,
    Awaited<ReturnType<ServicoService['buscarPorId']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new ServicoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: BuscarServicoPorIdInput): Promise<Awaited<ReturnType<ServicoService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
