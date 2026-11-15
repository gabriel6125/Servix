import { ClienteUpdateDto } from '../../dto/cliente/clienteUpdateDto';
import { Cliente } from '../../../dominio/entidades/cliente';
import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarClienteInput = { id: string; usuarioId: string; dados: ClienteUpdateDto };

export class AtualizarClienteUseCase implements UseCase<
    AtualizarClienteInput,
    Awaited<ReturnType<ClienteService['atualizar']>>
> {
    private readonly service = new ClienteService();

    public async execute({ id, usuarioId, dados }: AtualizarClienteInput): Promise<Awaited<ReturnType<ClienteService['atualizar']>>> {
        validarAtualizacao(dados);
        const atual = await this.service.buscarPorId(id, usuarioId);
        const cliente = Cliente.reconstruir({
            id,
            usuarioId,
            nome: dados.nome ?? atual.nome,
            telefone: dados.telefone === undefined ? atual.telefone : dados.telefone,
            email: dados.email === undefined ? atual.email : dados.email,
        });
        return this.service.atualizar(cliente);
    }
}
