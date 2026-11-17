import { PagamentoDao } from '../infra/bd/pg/pagamento.dao';
import { ServicoDao } from '../infra/bd/pg/servico.dao';
import { Pagamento } from '../dominio/entidades/pagamento';
import { HttpError } from '../util/http-error';

// Define o comportamento e os dados desta classe.
export class PagamentoService {
    // Mantem a dependencia dao disponivel para as operacoes da classe.
    private readonly dao = new PagamentoDao();
    // Mantem a dependencia servicoDao disponivel para as operacoes da classe.
    private readonly servicoDao = new ServicoDao();

    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async salvar(pagamento: Pagamento, usuarioId: string): Promise<Pagamento> {
        await this.validarServico(pagamento.servicoId, usuarioId);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const salvo = await this.dao.salvar(pagamento, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!salvo) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
        return salvo;
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public listar(usuarioId: string): Promise<Pagamento[]> {
        return this.dao.listar(usuarioId);
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(id: string, usuarioId: string): Promise<Pagamento> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const pagamento = await this.dao.buscarPorId(id, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!pagamento) {
            throw new HttpError(404, 'Pagamento não encontrado.');
        }
        return pagamento;
    }

    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async atualizar(pagamento: Pagamento, usuarioId: string): Promise<Pagamento> {
        await this.validarServico(pagamento.servicoId, usuarioId);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atualizado = await this.dao.atualizar(pagamento, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!atualizado) {
            throw new HttpError(404, 'Pagamento não encontrado.');
        }
        return atualizado;
    }

    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async excluir(id: string, usuarioId: string): Promise<void> {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Pagamento não encontrado.');
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
