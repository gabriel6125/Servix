import { ClienteDao } from '../infra/bd/pg/cliente.dao';
import { ServicoDao } from '../infra/bd/pg/servico.dao';
import { Servico } from '../dominio/entidades/servico';
import { HttpError } from '../util/http-error';

// Define o comportamento e os dados desta classe.
export class ServicoService {
    // Mantem a dependencia dao disponivel para as operacoes da classe.
    private readonly dao = new ServicoDao();
    // Mantem a dependencia clienteDao disponivel para as operacoes da classe.
    private readonly clienteDao = new ClienteDao();

    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async salvar(servico: Servico): Promise<Servico> {
        await this.validarCliente(servico.clienteId, servico.usuarioId);
        return this.dao.salvar(servico);
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public listar(usuarioId: string): Promise<Servico[]> {
        return this.dao.listar(usuarioId);
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(id: string, usuarioId: string): Promise<Servico> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const servico = await this.dao.buscarPorId(id, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!servico) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
        return servico;
    }

    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async atualizar(servico: Servico): Promise<Servico> {
        await this.validarCliente(servico.clienteId, servico.usuarioId);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atualizado = await this.dao.atualizar(servico);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!atualizado) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
        return atualizado;
    }

    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async excluir(id: string, usuarioId: string): Promise<void> {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
    }

    // Metodo validarCliente: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    private async validarCliente(clienteId: string, usuarioId: string): Promise<void> {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.clienteDao.buscarPorId(clienteId, usuarioId))) {
            throw new HttpError(404, 'Cliente não encontrado.');
        }
    }
}
