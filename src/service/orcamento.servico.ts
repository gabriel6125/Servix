import { OrcamentoDao } from '../infra/bd/pg/orcamento.dao';
import { ServicoDao } from '../infra/bd/pg/servico.dao';
import { Orcamento } from '../dominio/entidades/orcamento';
import { HttpError } from '../util/http-error';

export class OrcamentoService {
    private readonly dao = new OrcamentoDao();
    private readonly servicoDao = new ServicoDao();

    public async salvar(orcamento: Orcamento, usuarioId: string): Promise<Orcamento> {
        await this.validarServico(orcamento.servicoId, usuarioId);
        const salvo = await this.dao.salvar(orcamento, usuarioId);
        if (!salvo) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
        return salvo;
    }

    public listar(usuarioId: string): Promise<Orcamento[]> {
        return this.dao.listar(usuarioId);
    }

    public async buscarPorId(id: string, usuarioId: string): Promise<Orcamento> {
        const orcamento = await this.dao.buscarPorId(id, usuarioId);
        if (!orcamento) {
            throw new HttpError(404, 'Orçamento não encontrado.');
        }
        return orcamento;
    }

    public async atualizar(orcamento: Orcamento, usuarioId: string): Promise<Orcamento> {
        await this.validarServico(orcamento.servicoId, usuarioId);
        const atualizado = await this.dao.atualizar(orcamento, usuarioId);
        if (!atualizado) {
            throw new HttpError(404, 'Orçamento não encontrado.');
        }
        return atualizado;
    }

    public async excluir(id: string, usuarioId: string): Promise<void> {
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Orçamento não encontrado.');
        }
    }

    private async validarServico(servicoId: string, usuarioId: string): Promise<void> {
        if (!(await this.servicoDao.buscarPorId(servicoId, usuarioId))) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
    }
}
