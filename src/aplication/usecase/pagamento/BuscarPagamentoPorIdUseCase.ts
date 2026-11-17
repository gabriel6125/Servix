import { PagamentoService } from '../../../service/pagamento.servico';
import type { UseCase } from '../UseCase';

type BuscarPagamentoPorIdInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class BuscarPagamentoPorIdUseCase implements UseCase<
    BuscarPagamentoPorIdInput,
    Awaited<ReturnType<PagamentoService['buscarPorId']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new PagamentoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: BuscarPagamentoPorIdInput): Promise<Awaited<ReturnType<PagamentoService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
