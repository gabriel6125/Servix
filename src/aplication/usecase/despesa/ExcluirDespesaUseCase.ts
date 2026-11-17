import { DespesaService } from '../../../service/despesa.servico';
import type { UseCase } from '../UseCase';

type ExcluirDespesaInput = { id: string; usuarioId: string };

// Define o comportamento e os dados desta classe.
export class ExcluirDespesaUseCase implements UseCase<ExcluirDespesaInput, void> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new DespesaService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: ExcluirDespesaInput): Promise<void> {
        return this.service.excluir(input.id, input.usuarioId);
    }
}
