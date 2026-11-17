import { UsuarioUpdateDto } from '../../dto/usuario/usuarioUpdateDto';
import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarPerfilUsuarioInput = { id: string; dados: UsuarioUpdateDto };

// Define o comportamento e os dados desta classe.
export class AtualizarPerfilUsuarioUseCase implements UseCase<
    AtualizarPerfilUsuarioInput,
    Awaited<ReturnType<UsuarioService['atualizarPerfil']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new UsuarioService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public execute(input: AtualizarPerfilUsuarioInput): Promise<Awaited<ReturnType<UsuarioService['atualizarPerfil']>>> {
        validarAtualizacao(input.dados);
        return this.service.atualizarPerfil(input.id, input.dados);
    }
}
