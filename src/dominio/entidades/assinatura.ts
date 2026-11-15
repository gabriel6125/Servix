export type propsAssinatura = {
    id: string | null;
    usuarioId: string;
    planoId: string;
    status: string;
    dataInicio: string;
    dataFim: string | null;
};

export class Assinatura {
    private constructor(private props: propsAssinatura) {}

    public static construir(
        usuarioId: string,
        planoId: string,
        status: string,
        dataInicio: string,
        dataFim: string | null,
    ): Assinatura {
        if (!usuarioId || !planoId || !status || !dataInicio) {
            throw new Error('Todos os campos obrigatórios da assinatura devem ser informados.');
        }
        return new Assinatura({ id: null, usuarioId, planoId, status, dataInicio, dataFim });
    }

    public static reconstruir(props: propsAssinatura): Assinatura {
        return new Assinatura(props);
    }

    public get id() { return this.props.id; }
    public get usuarioId() { return this.props.usuarioId; }
    public get planoId() { return this.props.planoId; }
    public get status() { return this.props.status; }
    public get dataInicio() { return this.props.dataInicio; }
    public get dataFim() { return this.props.dataFim; }

    public toJSON() {
        return {
            id: this.id,
            usuario_id: this.usuarioId,
            plano_id: this.planoId,
            status: this.status,
            data_inicio: this.dataInicio,
            data_fim: this.dataFim,
        };
    }
}
