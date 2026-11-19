export type propsServico = {
    id: string | null;
    clienteId: string;
    usuarioId: string;
    descricao: string;
    status: string;
    dataPrevista: string | null;
    dataConclusao: string | null;
};
export declare class Servico {
    private props;
    private constructor();
    static construir(clienteId: string, usuarioId: string, descricao: string, status: string, dataPrevista: string | null, dataConclusao: string | null): Servico;
    static reconstruir(props: propsServico): Servico;
    get id(): string | null;
    get clienteId(): string;
    get usuarioId(): string;
    get descricao(): string;
    get status(): string;
    get dataPrevista(): string | null;
    get dataConclusao(): string | null;
    toJSON(): {
        id: string | null;
        cliente_id: string;
        usuario_id: string;
        descricao: string;
        status: string;
        data_prevista: string | null;
        data_conclusao: string | null;
    };
}
//# sourceMappingURL=servico.d.ts.map