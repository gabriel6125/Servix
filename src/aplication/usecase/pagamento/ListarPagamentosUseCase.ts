import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';

// Define o comportamento e os dados desta classe.
export class ListarPagamentosUseCase implements UseCase<string, Awaited<ReturnType<PagamentoService['listar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new PagamentoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(usuarioId: string): Promise<Awaited<ReturnType<PagamentoService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
