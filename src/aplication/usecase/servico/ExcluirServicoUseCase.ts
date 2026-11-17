import { ServicoService } from '../../../service/servico.servico';
import type { UseCase } from '../UseCase';

type ExcluirServicoInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class ExcluirServicoUseCase implements UseCase<ExcluirServicoInput, void> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new ServicoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: ExcluirServicoInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
