// Define o comportamento e os dados desta classe.
export class Orcamento {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    constructor(props) {
        this.props = props;
    }
    static construir(servicoId, valorPecas, valorMaoDeObra, outrosCustos, valorTotal, status, linkAcesso) {
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
    static reconstruir(props) {
        return new Orcamento(props);
    }
    get id() { return this.props.id; }
    get servicoId() { return this.props.servicoId; }
    get valorPecas() { return this.props.valorPecas; }
    get valorMaoDeObra() { return this.props.valorMaoDeObra; }
    get outrosCustos() { return this.props.outrosCustos; }
    get valorTotal() { return this.props.valorTotal; }
    get status() { return this.props.status; }
    get linkAcesso() { return this.props.linkAcesso; }
    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    toJSON() {
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
//# sourceMappingURL=orcamento.js.map