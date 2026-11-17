import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';

// Define o formato dos dados usados nesta parte da aplicacao.
export type RevogarSessaoUsuarioInput = {
    refreshToken: string;
};

// Define o comportamento e os dados desta classe.
export class RevogarSessaoUsuarioUseCase implements UseCase<RevogarSessaoUsuarioInput, void> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new UsuarioService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: RevogarSessaoUsuarioInput): Promise<void> {
        return this.service.revogarSessao(input.refreshToken);
    }
}
