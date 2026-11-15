import { PagamentoDao } from '../infra/bd/pg/pagamento.dao';
import { ServicoDao } from '../infra/bd/pg/servico.dao';
import { Pagamento } from '../dominio/entidades/pagamento';
import { HttpError } from '../util/http-error';

export class PagamentoService {
    private readonly dao = new PagamentoDao();
    private readonly servicoDao = new ServicoDao();

    public async salvar(pagamento: Pagamento, usuarioId: string): Promise<Pagamento> {
        await this.validarServico(pagamento.servicoId, usuarioId);
        const salvo = await this.dao.salvar(pagamento, usuarioId);
        if (!salvo) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
        return salvo;
    }

    public listar(usuarioId: string): Promise<Pagamento[]> {
        return this.dao.listar(usuarioId);
    }

    public async buscarPorId(id: string, usuarioId: string): Promise<Pagamento> {
        const pagamento = await this.dao.buscarPorId(id, usuarioId);
        if (!pagamento) {
            throw new HttpError(404, 'Pagamento não encontrado.');
        }
        return pagamento;
    }

    public async atualizar(pagamento: Pagamento, usuarioId: string): Promise<Pagamento> {
        await this.validarServico(pagamento.servicoId, usuarioId);
        const atualizado = await this.dao.atualizar(pagamento, usuarioId);
        if (!atualizado) {
            throw new HttpError(404, 'Pagamento não encontrado.');
        }
        return atualizado;
    }

    public async excluir(id: string, usuarioId: string): Promise<void> {
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Pagamento não encontrado.');
        }
    }

    private async validarServico(servicoId: string, usuarioId: string): Promise<void> {
        if (!(await this.servicoDao.buscarPorId(servicoId, usuarioId))) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
    }
}
