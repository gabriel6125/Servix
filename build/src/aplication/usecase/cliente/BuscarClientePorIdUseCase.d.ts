import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';
type BuscarClientePorIdInput = {
    id: string;
    usuarioId: string;
};
export declare class BuscarClientePorIdUseCase implements UseCase<BuscarClientePorIdInput, Awaited<ReturnType<ClienteService['buscarPorId']>>> {
    private readonly service;
    execute(input: BuscarClientePorIdInput): Promise<Awaited<ReturnType<ClienteService['buscarPorId']>>>;
}
export {};
//# sourceMappingURL=BuscarClientePorIdUseCase.d.ts.map