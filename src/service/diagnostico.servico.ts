import { DiagnosticoDao } from '../infra/bd/pg/diagnostico.dao';
import { ServicoDao } from '../infra/bd/pg/servico.dao';
import { Diagnostico } from '../dominio/entidades/diagnostico';
import { HttpError } from '../util/http-error';

// Define o comportamento e os dados desta classe.
export class DiagnosticoService {
    // Mantem a dependencia dao disponivel para as operacoes da classe.
    private readonly dao = new DiagnosticoDao();
    // Mantem a dependencia servicoDao disponivel para as operacoes da classe.
    private readonly servicoDao = new ServicoDao();

    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async salvar(diagnostico: Diagnostico, usuarioId: string): Promise<Diagnostico> {
        await this.validarServico(diagnostico.servicoId, usuarioId);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const salvo = await this.dao.salvar(diagnostico, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!salvo) {
            throw new HttpError(404, 'Serviço não encontrado.');
        }
        return salvo;
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public listar(usuarioId: string): Promise<Diagnostico[]> {
        return this.dao.listar(usuarioId);
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(id: string, usuarioId: string): Promise<Diagnostico> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const diagnostico = await this.dao.buscarPorId(id, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!diagnostico) {
            throw new HttpError(404, 'Diagnóstico não encontrado.');
        }
        return diagnostico;
    }

    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async atualizar(diagnostico: Diagnostico, usuarioId: string): Promise<Diagnostico> {
        await this.validarServico(diagnostico.servicoId, usuarioId);
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atualizado = await this.dao.atualizar(diagnostico, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!atualizado) {
            throw new HttpError(404, 'Diagnóstico não encontrado.');
        }
        return atualizado;
    }

    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async excluir(id: string, usuarioId: string): Promise<void> {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Diagnóstico não encontrado.');
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
