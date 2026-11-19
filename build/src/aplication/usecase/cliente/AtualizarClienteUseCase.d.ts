import { ClienteUpdateDto } from '../../dto/cliente/clienteUpdateDto';
import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';
type AtualizarClienteInput = {
    id: string;
    usuarioId: string;
    dados: ClienteUpdateDto;
};
export declare class AtualizarClienteUseCase implements UseCase<AtualizarClienteInput, Awaited<ReturnType<ClienteService['atualizar']>>> {
    private readonly service;
    execute({ id, usuarioId, dados }: AtualizarClienteInput): Promise<Awaited<ReturnType<ClienteService['atualizar']>>>;
}
export {};
//# sourceMappingURL=AtualizarClienteUseCase.d.ts.map