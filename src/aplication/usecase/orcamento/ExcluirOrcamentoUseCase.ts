import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';

type ExcluirOrcamentoInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class ExcluirOrcamentoUseCase implements UseCase<ExcluirOrcamentoInput, void> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new OrcamentoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: ExcluirOrcamentoInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
