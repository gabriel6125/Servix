import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';

// Define o comportamento e os dados desta classe.
export class ListarDespesasUseCase implements UseCase<string, Awaited<ReturnType<DespesaService['listar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new DespesaService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(usuarioId: string): Promise<Awaited<ReturnType<DespesaService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
