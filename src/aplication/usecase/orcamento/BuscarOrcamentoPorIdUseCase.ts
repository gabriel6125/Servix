import { OrcamentoService } from '../../../service/orcamento.servico';
import type { UseCase } from '../UseCase';

type BuscarOrcamentoPorIdInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class BuscarOrcamentoPorIdUseCase implements UseCase<
    BuscarOrcamentoPorIdInput,
    Awaited<ReturnType<OrcamentoService['buscarPorId']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new OrcamentoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: BuscarOrcamentoPorIdInput): Promise<Awaited<ReturnType<OrcamentoService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
