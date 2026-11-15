import { UsuarioLoginDto } from '../../dto/usuario/usuarioLoginDto';
import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';

type AutenticarUsuarioOutput = Awaited<ReturnType<UsuarioService['autenticar']>>;

export class AutenticarUsuarioUseCase implements UseCase<UsuarioLoginDto, AutenticarUsuarioOutput> {
    private readonly service = new UsuarioService();

    public execute(input: UsuarioLoginDto): Promise<AutenticarUsuarioOutput> {
        return this.service.autenticar(input.email, input.senha);
    }
}
