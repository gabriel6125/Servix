export type propsPagamento = {
    id: string | null;
    servicoId: string;
    valor: number;
    dataPagamento: string;
};

export class Pagamento {
    private constructor(private props: propsPagamento) {}

    public static construir(
        servicoId: string,
        valor: number,
        dataPagamento: string,
    ): Pagamento {
        if (!servicoId || !dataPagamento || !Number.isFinite(valor)) {
            throw new Error('Todos os campos obrigatórios do pagamento devem ser válidos.');
        }
        return new Pagamento({ id: null, servicoId, valor, dataPagamento });
    }

    public static reconstruir(props: propsPagamento): Pagamento {
        return new Pagamento(props);
    }

    public get id() { return this.props.id; }
    public get servicoId() { return this.props.servicoId; }
    public get valor() { return this.props.valor; }
    public get dataPagamento() { return this.props.dataPagamento; }

    public toJSON() {
        return {
            id: this.id,
            servico_id: this.servicoId,
            valor: this.valor,
            data_pagamento: this.dataPagamento,
        };
    }
}
