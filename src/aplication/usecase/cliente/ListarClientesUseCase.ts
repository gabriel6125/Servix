import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';

// Define o comportamento e os dados desta classe.
export class ListarClientesUseCase implements UseCase<string, Awaited<ReturnType<ClienteService['listar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new ClienteService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(usuarioId: string): Promise<Awaited<ReturnType<ClienteService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
