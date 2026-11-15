import { DiagnosticoDao } from '../infra/bd/pg/diagnostico.dao';
import { ServicoDao } from '../infra/bd/pg/servico.dao';
import { Diagnostico } from '../dominio/entidades/diagnostico';
import { HttpError } from '../util/http-error';

export class DiagnosticoService {
    private readonly dao = new DiagnosticoDao();
    private readonly servicoDao = new ServicoDao();

    public async salvar(diagnostico: Diagnostico, usuarioId: string): Promise<Diagnostico> {
        await this.validarServico(diagnostico.servicoId, usuarioId);
        const salvo = await this.dao.salvar(diagnostico, usuarioId);
        if (!salvo) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
        return salvo;
    }

    public listar(usuarioId: string): Promise<Diagnostico[]> {
        return this.dao.listar(usuarioId);
    }

    public async buscarPorId(id: string, usuarioId: string): Promise<Diagnostico> {
        const diagnostico = await this.dao.buscarPorId(id, usuarioId);
        if (!diagnostico) {
            throw new HttpError(404, 'Diagnóstico não encontrado.');
        }
        return diagnostico;
    }

    public async atualizar(diagnostico: Diagnostico, usuarioId: string): Promise<Diagnostico> {
        await this.validarServico(diagnostico.servicoId, usuarioId);
        const atualizado = await this.dao.atualizar(diagnostico, usuarioId);
        if (!atualizado) {
            throw new HttpError(404, 'Diagnóstico não encontrado.');
        }
        return atualizado;
    }

    public async excluir(id: string, usuarioId: string): Promise<void> {
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Diagnóstico não encontrado.');
        }
    }

    private async validarServico(servicoId: string, usuarioId: string): Promise<void> {
        if (!(await this.servicoDao.buscarPorId(servicoId, usuarioId))) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
    }
}
