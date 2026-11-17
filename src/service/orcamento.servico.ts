import { OrcamentoDao } from '../infra/bd/pg/orcamento.dao';
import { ServicoDao } from '../infra/bd/pg/servico.dao';
import { Orcamento } from '../dominio/entidades/orcamento';
import { HttpError } from '../util/http-error';

// Define o comportamento e os dados desta classe.
export class OrcamentoService {
    // Mantem a dependencia dao disponivel para as operacoes da classe.
    private readonly dao = new OrcamentoDao();
    // Mantem a dependencia servicoDao disponivel para as operacoes da classe.
    private readonly servicoDao = new ServicoDao();

    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async salvar(orcamento: Orcamento, usuarioId: string): Promise<Orcamento> {
        await this.validarServico(orcamento.servicoId, usuarioId);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const salvo = await this.dao.salvar(orcamento, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!salvo) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
        return salvo;
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public listar(usuarioId: string): Promise<Orcamento[]> {
        return this.dao.listar(usuarioId);
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(id: string, usuarioId: string): Promise<Orcamento> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const orcamento = await this.dao.buscarPorId(id, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!orcamento) {
            throw new HttpError(404, 'Orçamento não encontrado.');
        }
        return orcamento;
    }

    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async atualizar(orcamento: Orcamento, usuarioId: string): Promise<Orcamento> {
        await this.validarServico(orcamento.servicoId, usuarioId);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atualizado = await this.dao.atualizar(orcamento, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!atualizado) {
            throw new HttpError(404, 'Orçamento não encontrado.');
        }
        return atualizado;
    }

    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async excluir(id: string, usuarioId: string): Promise<void> {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Orçamento não encontrado.');
        }
    }

    // Metodo validarServico: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    private async validarServico(servicoId: string, usuarioId: string): Promise<void> {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.servicoDao.buscarPorId(servicoId, usuarioId))) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
    }
}
