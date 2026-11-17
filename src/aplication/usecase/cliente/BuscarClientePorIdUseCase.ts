import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';

type BuscarClientePorIdInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class BuscarClientePorIdUseCase implements UseCase<
    BuscarClientePorIdInput,
    Awaited<ReturnType<ClienteService['buscarPorId']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new ClienteService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: BuscarClientePorIdInput): Promise<Awaited<ReturnType<ClienteService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
