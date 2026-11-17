import { DespesaDao } from '../infra/bd/pg/despesa.dao';
import { Despesa } from '../dominio/entidades/despesa';
import { HttpError } from '../util/http-error';

// Define o comportamento e os dados desta classe.
export class DespesaService {
    // Mantem a dependencia dao disponivel para as operacoes da classe.
    private readonly dao = new DespesaDao();

    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public salvar(despesa: Despesa): Promise<Despesa> {
        return this.dao.salvar(despesa);
    }

    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public listar(usuarioId: string): Promise<Despesa[]> {
        return this.dao.listar(usuarioId);
    }

    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async buscarPorId(id: string, usuarioId: string): Promise<Despesa> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const despesa = await this.dao.buscarPorId(id, usuarioId);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!despesa) {
            throw new HttpError(404, 'Despesa não encontrada.');
        }
        return despesa;
    }

    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async atualizar(despesa: Despesa): Promise<Despesa> {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const atualizada = await this.dao.atualizar(despesa);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!atualizada) {
            throw new HttpError(404, 'Despesa não encontrada.');
        }
        return atualizada;
    }

    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public async excluir(id: string, usuarioId: string): Promise<void> {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!(await this.dao.excluir(id, usuarioId))) {
            throw new HttpError(404, 'Despesa não encontrada.');
        }
    }
}
