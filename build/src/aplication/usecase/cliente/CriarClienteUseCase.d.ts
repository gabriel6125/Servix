import { ClienteCreateDto } from '../../dto/cliente/clienteCreateDto';
import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';
type CriarClienteInput = {
    usuarioId: string;
    dados: ClienteCreateDto;
};
export declare class CriarClienteUseCase implements UseCase<CriarClienteInput, Awaited<ReturnType<ClienteService['salvar']>>> {
    private readonly service;
    execute({ usuarioId, dados }: CriarClienteInput): Promise<Awaited<ReturnType<ClienteService['salvar']>>>;
}
export {};
//# sourceMappingURL=CriarClienteUseCase.d.ts.map