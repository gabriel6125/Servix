// Define o comportamento e os dados desta classe.
export class Pagamento {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    constructor(props) {
        this.props = props;
    }
    static construir(servicoId, valor, dataPagamento) {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!servicoId || !dataPagamento || !Number.isFinite(valor)) {
            throw new Error('Todos os campos obrigatórios do pagamento devem ser válidos.');
        }
        return new Pagamento({ id: null, servicoId, valor, dataPagamento });
    }
    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    static reconstruir(props) {
        return new Pagamento(props);
    }
    get id() { return this.props.id; }
    get servicoId() { return this.props.servicoId; }
    get valor() { return this.props.valor; }
    get dataPagamento() { return this.props.dataPagamento; }
    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    toJSON() {
        return {
            id: this.id,
            servico_id: this.servicoId,
            valor: this.valor,
            data_pagamento: this.dataPagamento,
        };
    }
}
//# sourceMappingURL=pagamento.js.map