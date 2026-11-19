export type propsAssinatura = {
    id: string | null;
    usuarioId: string;
    planoId: string;
    status: string;
    dataInicio: string;
    dataFim: string | null;
};
export declare class Assinatura {
    private props;
    private constructor();
    static construir(usuarioId: string, planoId: string, status: string, dataInicio: string, dataFim: string | null): Assinatura;
    static reconstruir(props: propsAssinatura): Assinatura;
    get id(): string | null;
    get usuarioId(): string;
    get planoId(): string;
    get status(): string;
    get dataInicio(): string;
    get dataFim(): string | null;
    toJSON(): {
        id: string | null;
        usuario_id: string;
        plano_id: string;
        status: string;
        data_inicio: string;
        data_fim: string | null;
    };
}
//# sourceMappingURL=assinatura.d.ts.map