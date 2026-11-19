export type propsDiagnostico = {
    id: string | null;
    servicoId: string;
    problemaIdentificado: string;
    observacoes: string | null;
};
export declare class Diagnostico {
    private props;
    private constructor();
    static construir(servicoId: string, problemaIdentificado: string, observacoes: string | null): Diagnostico;
    static reconstruir(props: propsDiagnostico): Diagnostico;
    get id(): string | null;
    get servicoId(): string;
    get problemaIdentificado(): string;
    get observacoes(): string | null;
    toJSON(): {
        id: string | null;
        servico_id: string;
        problema_identificado: string;
        observacoes: string | null;
    };
}
//# sourceMappingURL=diagnostico.d.ts.map