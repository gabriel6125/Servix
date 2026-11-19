export type propsDespesa = {
    id: string | null;
    usuarioId: string;
    descricao: string;
    valor: number;
    dataDespesa: string;
};
export declare class Despesa {
    private props;
    private constructor();
    static construir(usuarioId: string, descricao: string, valor: number, dataDespesa: string): Despesa;
    static reconstruir(props: propsDespesa): Despesa;
    get id(): string | null;
    get usuarioId(): string;
    get descricao(): string;
    get valor(): number;
    get dataDespesa(): string;
    toJSON(): {
        id: string | null;
        usuario_id: string;
        descricao: string;
        valor: number;
        data_despesa: string;
    };
}
//# sourceMappingURL=despesa.d.ts.map