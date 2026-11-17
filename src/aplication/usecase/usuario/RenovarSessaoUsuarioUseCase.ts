import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';

// Define o formato dos dados usados nesta parte da aplicacao.
export type RenovarSessaoUsuarioInput = {
    refreshToken: string;
};

type RenovarSessaoUsuarioOutput = Awaited<ReturnType<UsuarioService['renovarSessao']>>;

// Define o comportamento e os dados desta classe.
export class RenovarSessaoUsuarioUseCase
implements UseCase<RenovarSessaoUsuarioInput, RenovarSessaoUsuarioOutput> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new UsuarioService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: RenovarSessaoUsuarioInput): Promise<RenovarSessaoUsuarioOutput> {
        return this.service.renovarSessao(input.refreshToken);
    }
}
