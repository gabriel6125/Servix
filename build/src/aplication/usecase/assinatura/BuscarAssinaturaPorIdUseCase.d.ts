import { AssinaturaService } from '../../../service/assinatura.servico';
import type { UseCase } from '../UseCase';
type BuscarAssinaturaPorIdInput = {
    id: string;
    usuarioId: string;
};
export declare class BuscarAssinaturaPorIdUseCase implements UseCase<BuscarAssinaturaPorIdInput, Awaited<ReturnType<AssinaturaService['buscarPorId']>>> {
    private readonly service;
    execute(input: BuscarAssinaturaPorIdInput): Promise<Awaited<ReturnType<AssinaturaService['buscarPorId']>>>;
}
export {};
//# sourceMappingURL=BuscarAssinaturaPorIdUseCase.d.ts.map