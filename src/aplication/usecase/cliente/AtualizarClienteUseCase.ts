import { ClienteUpdateDto } from '../../dto/cliente/clienteUpdateDto';
import { Cliente } from '../../../dominio/entidades/cliente';
import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';
import { validarAtualizacao } from '../validar-atualizacao';

type AtualizarClienteInput = { id: string; usuarioId: string; dados: ClienteUpdateDto };

// Define o comportamento e os dados desta classe.
export class AtualizarClienteUseCase implements UseCase<
    AtualizarClienteInput,
    Awaited<ReturnType<ClienteService['atualizar']>>
> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new ClienteService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async execute({ id, usuarioId, dados }: AtualizarClienteInput): Promise<Awaited<ReturnType<ClienteService['atualizar']>>> {
        validarAtualizacao(dados);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
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
