import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';

type ExcluirPagamentoInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class ExcluirPagamentoUseCase implements UseCase<ExcluirPagamentoInput, void> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new PagamentoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: ExcluirPagamentoInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
