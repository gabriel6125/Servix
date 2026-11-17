import { AssinaturaUpdateDto } from '../../dto/assinatura/assinaturaUpdateDto';
import { Assinatura } from '../../../dominio/entidades/assinatura';
import { AssinaturaService } from '../../../service/assinatura.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarAssinaturaInput = { id: string; usuarioId: string; dados: AssinaturaUpdateDto };

// Define o comportamento e os dados desta classe.
export class AtualizarAssinaturaUseCase implements UseCase<
    AtualizarAssinaturaInput,
    Awaited<ReturnType<AssinaturaService['atualizar']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new AssinaturaService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async execute({ id, usuarioId, dados }: AtualizarAssinaturaInput): Promise<Awaited<ReturnType<AssinaturaService['atualizar']>>> {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atual = await this.service.buscarPorId(id, usuarioId);
        const assinatura = Assinatura.reconstruir({
            id,
            usuarioId,
            planoId: dados.plano_id?.toString() ?? atual.planoId,
            status: dados.status ?? atual.status,
            dataInicio: dados.data_inicio ?? atual.dataInicio,
            dataFim: dados.data_fim === undefined ? atual.dataFim : dados.data_fim,
        });
        return this.service.atualizar(assinatura);
    }
}
