import { ClienteDao } from '../infra/bd/pg/cliente.dao';
import { Cliente } from '../dominio/entidades/cliente';
import { HttpError } from '../util/http-error';

// Define o comportamento e os dados desta classe.
export class ClienteService {
    // Mantem a dependencia dao disponivel para as operacoes da classe.
    private readonly dao = new ClienteDao();

    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public salvar(cliente: Cliente): Promise<Cliente> {
        return this.dao.salvar(cliente);
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public listar(usuarioId: string): Promise<Cliente[]> {
        return this.dao.listar(usuarioId);
    }

    public buscarPorNome(nome: string, usuarioId: string): Promise<Cliente[]> {
        return this.dao.buscarPorNome(nome, usuarioId);
    }

    public listarPorServico(servicoId: string, usuarioId: string): Promise<Cliente[]> {
        return this.dao.listarPorServico(servicoId, usuarioId);
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(id: string, usuarioId: string): Promise<Cliente> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const cliente = await this.dao.buscarPorId(id, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!cliente) {
            throw new HttpError(404, 'Cliente não encontrado.');
        }
        return cliente;
    }

    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async atualizar(cliente: Cliente): Promise<Cliente> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atualizado = await this.dao.atualizar(cliente);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!atualizado) {
            throw new HttpError(404, 'Cliente não encontrado.');
        }
        return atualizado;
    }

    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async excluir(id: string, usuarioId: string): Promise<void> {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Cliente não encontrado.');
        }
    }
}
