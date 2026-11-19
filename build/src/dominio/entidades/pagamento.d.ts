export type propsPagamento = {
    id: string | null;
    servicoId: string;
    valor: number;
    dataPagamento: string;
};
export declare class Pagamento {
    private props;
    private constructor();
    static construir(servicoId: string, valor: number, dataPagamento: string): Pagamento;
    static reconstruir(props: propsPagamento): Pagamento;
    get id(): string | null;
    get servicoId(): string;
    get valor(): number;
    get dataPagamento(): string;
    toJSON(): {
        id: string | null;
        servico_id: string;
        valor: number;
        data_pagamento: string;
    };
}
//# sourceMappingURL=pagamento.d.ts.map