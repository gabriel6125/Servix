export type propsDespesa = {
    id: string | null;
    usuarioId: string;
    descricao: string;
    valor: number;
    dataDespesa: string;
};

export class Despesa {
    private constructor(private props: propsDespesa) {}

    public static construir(
        usuarioId: string,
        descricao: string,
        valor: number,
        dataDespesa: string,
    ): Despesa {
        if (!usuarioId || !descricao || !dataDespesa || !Number.isFinite(valor)) {
            throw new Error('Todos os campos obrigatórios da despesa devem ser válidos.');
        }
        return new Despesa({ id: null, usuarioId, descricao, valor, dataDespesa });
    }

    public static reconstruir(props: propsDespesa): Despesa {
        return new Despesa(props);
    }

    public get id() { return this.props.id; }
    public get usuarioId() { return this.props.usuarioId; }
    public get descricao() { return this.props.descricao; }
    public get valor() { return this.props.valor; }
    public get dataDespesa() { return this.props.dataDespesa; }

    public toJSON() {
        return {
            id: this.id,
            usuario_id: this.usuarioId,
            descricao: this.descricao,
            valor: this.valor,
            data_despesa: this.dataDespesa,
        };
    }
}
