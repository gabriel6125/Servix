import { ClienteDao } from '../infra/bd/pg/cliente.dao';
import { ServicoDao } from '../infra/bd/pg/servico.dao';
import { Servico } from '../dominio/entidades/servico';
import { HttpError } from '../util/http-error';

export class ServicoService {
    private readonly dao = new ServicoDao();
    private readonly clienteDao = new ClienteDao();

    public async salvar(servico: Servico): Promise<Servico> {
        await this.validarCliente(servico.clienteId, servico.usuarioId);
        return this.dao.salvar(servico);
    }

    public listar(usuarioId: string): Promise<Servico[]> {
        return this.dao.listar(usuarioId);
    }

    public async buscarPorId(id: string, usuarioId: string): Promise<Servico> {
        const servico = await this.dao.buscarPorId(id, usuarioId);
        if (!servico) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
        return servico;
    }

    public async atualizar(servico: Servico): Promise<Servico> {
        await this.validarCliente(servico.clienteId, servico.usuarioId);
        const atualizado = await this.dao.atualizar(servico);
        if (!atualizado) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
        return atualizado;
    }

    public async excluir(id: string, usuarioId: string): Promise<void> {
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
    }

    private async validarCliente(clienteId: string, usuarioId: string): Promise<void> {
        if (!(await this.clienteDao.buscarPorId(clienteId, usuarioId))) {
            throw new HttpError(404, 'Cliente não encontrado.');
        }
    }
}
