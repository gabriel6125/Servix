import { UsuarioCreateDto } from '../../dto/usuario/usuarioCreateDto';
import { Usuario } from '../../../dominio/entidades/usuario';
import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';

type RegistrarUsuarioInput = UsuarioCreateDto;
type RegistrarUsuarioOutput = Awaited<ReturnType<UsuarioService['registrar']>>;

// Define o comportamento e os dados desta classe.
export class RegistrarUsuarioUseCase implements UseCase<RegistrarUsuarioInput, RegistrarUsuarioOutput> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new UsuarioService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: RegistrarUsuarioInput): Promise<RegistrarUsuarioOutput> {
        return this.service.registrar(Usuario.construir(input.nome, input.email, input.senha));
    }
}
