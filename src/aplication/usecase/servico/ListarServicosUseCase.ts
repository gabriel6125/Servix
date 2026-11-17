import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';

// Define o comportamento e os dados desta classe.
export class ListarServicosUseCase implements UseCase<string, Awaited<ReturnType<ServicoService['listar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new ServicoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(usuarioId: string): Promise<Awaited<ReturnType<ServicoService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
