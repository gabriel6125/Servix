import { UsuarioCreateDto } from '../../dto/usuario/usuarioCreateDto';
import { Usuario } from '../../../dominio/entidades/usuario';
import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';

type RegistrarUsuarioInput = UsuarioCreateDto;
type RegistrarUsuarioOutput = Awaited<ReturnType<UsuarioService['registrar']>>;

export class RegistrarUsuarioUseCase implements UseCase<RegistrarUsuarioInput, RegistrarUsuarioOutput> {
    private readonly service = new UsuarioService();

    public execute(input: RegistrarUsuarioInput): Promise<RegistrarUsuarioOutput> {
        return this.service.registrar(Usuario.construir(input.nome, input.email, input.senha));
    }
}
