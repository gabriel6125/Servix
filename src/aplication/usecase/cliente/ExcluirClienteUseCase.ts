import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';

type ExcluirClienteInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class ExcluirClienteUseCase implements UseCase<ExcluirClienteInput, void> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new ClienteService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: ExcluirClienteInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
