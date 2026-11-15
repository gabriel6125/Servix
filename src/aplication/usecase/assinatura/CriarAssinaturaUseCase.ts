import { AssinaturaCreateDto } from '../../dto/assinatura/assinaturaCreateDto';
import { Assinatura } from '../../../dominio/entidades/assinatura';
import { AssinaturaService } from '../../../service/assinatura.servico';
import type { UseCase } from '../UseCase';

type CriarAssinaturaInput = { usuarioId: string; dados: AssinaturaCreateDto };

export class CriarAssinaturaUseCase implements UseCase<CriarAssinaturaInput, Awaited<ReturnType<AssinaturaService['salvar']>>> {
    private readonly service = new AssinaturaService();

    public execute({ usuarioId, dados }: CriarAssinaturaInput): Promise<Awaited<ReturnType<AssinaturaService['salvar']>>> {
        const assinatura = Assinatura.construir(
            usuarioId,
            dados.plano_id.toString(),
            dados.status,
            dados.data_inicio,
            dados.data_fim ?? null,
        );
        return this.service.salvar(assinatura);
    }
}
