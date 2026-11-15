import { UsuarioService } from '../../../service/usuario.servico';
import type { UseCase } from '../UseCase';

export class ExcluirUsuarioUseCase implements UseCase<string, void> {
    private readonly service = new UsuarioService();

    public execute(id: string): Promise<void> {
        return this.service.excluir(id);
    }
}
