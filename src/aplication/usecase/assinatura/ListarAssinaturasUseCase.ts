import { AssinaturaService } from '../../../service/assinatura.servico';
import type { UseCase } from '../UseCase';

// Define o comportamento e os dados desta classe.
export class ListarAssinaturasUseCase implements UseCase<string, Awaited<ReturnType<AssinaturaService['listar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new AssinaturaService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(usuarioId: string): Promise<Awaited<ReturnType<AssinaturaService['listar']>>> {
        return this.service.listar(usuarioId);
    }
}
