import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';

export class BuscarUsuarioPorIdUseCase implements UseCase<string, Awaited<ReturnType<UsuarioService['buscarPorId']>>> {
    private readonly service = new UsuarioService();

    public execute(id: string): Promise<Awaited<ReturnType<UsuarioService['buscarPorId']>>> {
        return this.service.buscarPorId(id);
    }
}
