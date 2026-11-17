// Define o formato dos dados usados nesta parte da aplicacao.
export type propsPagamento = {
    id: string | null;
    servicoId: string;
    valor: number;
    dataPagamento: string;
};

// Define o comportamento e os dados desta classe.
export class Pagamento {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    private constructor(private props: propsPagamento) {}

    public static construir(
        servicoId: string,
        valor: number,
        dataPagamento: string,
    ): Pagamento {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!servicoId || !dataPagamento || !Number.isFinite(valor)) {
            throw new Error('Todos os campos obrigatórios do pagamento devem ser válidos.');
        }
        return new Pagamento({ id: null, servicoId, valor, dataPagamento });
    }

    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public static reconstruir(props: propsPagamento): Pagamento {
        return new Pagamento(props);
    }

    public get id() { return this.props.id; }
    public get servicoId() { return this.props.servicoId; }
    public get valor() { return this.props.valor; }
    public get dataPagamento() { return this.props.dataPagamento; }

    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public toJSON() {
        return {
            id: this.id,
            servico_id: this.servicoId,
            valor: this.valor,
            data_pagamento: this.dataPagamento,
        };
    }
}
