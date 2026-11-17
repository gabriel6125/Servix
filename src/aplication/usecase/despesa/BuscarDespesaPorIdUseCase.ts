import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';

type BuscarDespesaPorIdInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class BuscarDespesaPorIdUseCase implements UseCase<
    BuscarDespesaPorIdInput,
    Awaited<ReturnType<DespesaService['buscarPorId']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new DespesaService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: BuscarDespesaPorIdInput): Promise<Awaited<ReturnType<DespesaService['buscarPorId']>>> {
        return this.service.buscarPorId(input.id, input.usuarioId);
    }
}
