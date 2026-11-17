import { UsuarioLoginDto } from '../../dto/usuario/usuarioLoginDto';
import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';

type AutenticarUsuarioOutput = Awaited<ReturnType<UsuarioService['autenticar']>>;

// Define o comportamento e os dados desta classe.
export class AutenticarUsuarioUseCase implements UseCase<UsuarioLoginDto, AutenticarUsuarioOutput> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new UsuarioService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: UsuarioLoginDto): Promise<AutenticarUsuarioOutput> {
        return this.service.autenticar(input.email, input.senha);
    }
}
