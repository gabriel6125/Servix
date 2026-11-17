// Define o formato dos dados usados nesta parte da aplicacao.
export type propsOrcamento = {
    id: string | null;
    servicoId: string;
    valorPecas: number | null;
    valorMaoDeObra: number | null;
    outrosCustos: number | null;
    valorTotal: number;
    status: string;
    linkAcesso: string | null;
};

// Define o comportamento e os dados desta classe.
export class Orcamento {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    private constructor(private props: propsOrcamento) {}

    public static construir(
        servicoId: string,
        valorPecas: number | null,
        valorMaoDeObra: number | null,
        outrosCustos: number | null,
        valorTotal: number,
        status: string,
        linkAcesso: string | null,
    ): Orcamento {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!servicoId || !status || !Number.isFinite(valorTotal)) {
            throw new Error('Serviço, valor total e status são obrigatórios.');
        }
        return new Orcamento({
            id: null,
            servicoId,
            valorPecas,
            valorMaoDeObra,
            outrosCustos,
            valorTotal,
            status,
            linkAcesso,
        });
    }

    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public static reconstruir(props: propsOrcamento): Orcamento {
        return new Orcamento(props);
    }

    public get id() { return this.props.id; }
    public get servicoId() { return this.props.servicoId; }
    public get valorPecas() { return this.props.valorPecas; }
    public get valorMaoDeObra() { return this.props.valorMaoDeObra; }
    public get outrosCustos() { return this.props.outrosCustos; }
    public get valorTotal() { return this.props.valorTotal; }
    public get status() { return this.props.status; }
    public get linkAcesso() { return this.props.linkAcesso; }

    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public toJSON() {
        return {
            id: this.id,
            servico_id: this.servicoId,
            valor_pecas: this.valorPecas,
            valor_mao_de_obra: this.valorMaoDeObra,
            outros_custos: this.outrosCustos,
            valor_total: this.valorTotal,
            status: this.status,
            link_acesso: this.linkAcesso,
        };
    }
}
