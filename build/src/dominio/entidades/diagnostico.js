// Define o comportamento e os dados desta classe.
export class Diagnostico {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    constructor(props) {
        this.props = props;
    }
    static construir(servicoId, problemaIdentificado, observacoes) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!servicoId || !problemaIdentificado) {
            throw new Error('Serviço e problema identificado são obrigatórios.');
        }
        return new Diagnostico({ id: null, servicoId, problemaIdentificado, observacoes });
    }
    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    static reconstruir(props) {
        return new Diagnostico(props);
    }
    get id() { return this.props.id; }
    get servicoId() { return this.props.servicoId; }
    get problemaIdentificado() { return this.props.problemaIdentificado; }
    get observacoes() { return this.props.observacoes; }
    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    toJSON() {
        return {
            id: this.id,
            servico_id: this.servicoId,
            problema_identificado: this.problemaIdentificado,
            observacoes: this.observacoes,
        };
    }
}
//# sourceMappingURL=diagnostico.js.map