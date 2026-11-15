export type propsPlano = {
    id: string | null;
    nome: string;
    valor: number;
    periodicidade: string;
    funcionalidades: string[] | null;
};

export class Plano {
    private constructor(private props: propsPlano) {}

    public static construir(
        nome: string,
        valor: number,
        periodicidade: string,
        funcionalidades: string[] | null,
    ): Plano {
        if (!nome || !periodicidade || !Number.isFinite(valor)) {
            throw new Error('Nome, valor e periodicidade são obrigatórios.');
        }
        return new Plano({ id: null, nome, valor, periodicidade, funcionalidades });
    }

    public static reconstruir(props: propsPlano): Plano {
        return new Plano(props);
    }

    public get id() { return this.props.id; }
    public get nome() { return this.props.nome; }
    public get valor() { return this.props.valor; }
    public get periodicidade() { return this.props.periodicidade; }
    public get funcionalidades() { return this.props.funcionalidades; }

    public toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            valor: this.valor,
            periodicidade: this.periodicidade,
            funcionalidades: this.funcionalidades,
        };
    }
}
