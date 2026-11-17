import { PlanoService } from '../../../service/plano.servico';
import type { UseCase } from '../UseCase';

// Define o comportamento e os dados desta classe.
export class ExcluirPlanoUseCase implements UseCase<string, void> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new PlanoService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(id: string): Promise<void> {
        return this.service.excluir(id);
    }
}
