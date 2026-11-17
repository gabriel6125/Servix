import { ClienteCreateDto } from '../../dto/cliente/clienteCreateDto';
import { Cliente } from '../../../dominio/entidades/cliente';
import { ClienteService } from '../../../service/cliente.servico';
import type { UseCase } from '../UseCase';

type CriarClienteInput = { usuarioId: string; dados: ClienteCreateDto };

// Define o comportamento e os dados desta classe.
export class CriarClienteUseCase implements UseCase<CriarClienteInput, Awaited<ReturnType<ClienteService['salvar']>>> {
    // Mantem a dependencia service disponivel para as operacoes da classe.
    private readonly service = new ClienteService();

    // Metodo execute: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
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
