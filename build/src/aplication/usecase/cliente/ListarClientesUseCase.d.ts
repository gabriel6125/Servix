import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';
export declare class ListarClientesUseCase implements UseCase<string, Awaited<ReturnType<ClienteService['listar']>>> {
    private readonly service;
    execute(usuarioId: string): Promise<Awaited<ReturnType<ClienteService['listar']>>>;
}
//# sourceMappingURL=ListarClientesUseCase.d.ts.map