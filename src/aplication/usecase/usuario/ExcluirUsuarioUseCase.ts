import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';

// Define o comportamento e os dados desta classe.
export class ExcluirUsuarioUseCase implements UseCase<string, void> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new UsuarioService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(id: string): Promise<void> {
        return this.service.excluir(id);
    }
}
