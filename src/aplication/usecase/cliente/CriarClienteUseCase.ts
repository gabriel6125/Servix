import { ClienteCreateDto } from '../../dto/cliente/clienteCreateDto';
import { Cliente } from '../../../dominio/entidades/cliente';
import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';

type CriarClienteInput = { usuarioId: string; dados: ClienteCreateDto };

export class CriarClienteUseCase implements UseCase<CriarClienteInput, Awaited<ReturnType<ClienteService['salvar']>>> {
    private readonly service = new ClienteService();

    public execute({ usuarioId, dados }: CriarClienteInput): Promise<Awaited<ReturnType<ClienteService['salvar']>>> {
        const cliente = Cliente.construir(
            usuarioId,
            dados.nome,
            dados.telefone ?? null,
            dados.email ?? null,
        );
        return this.service.salvar(cliente);
    }
}
