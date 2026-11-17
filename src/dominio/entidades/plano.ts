// Define o formato dos dados usados nesta parte da aplicacao.
export type propsPlano = {
    id: string | null;
    nome: string;
    valor: number;
    periodicidade: string;
    funcionalidades: string[] | null;
};

// Define o comportamento e os dados desta classe.
export class Plano {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    private constructor(private props: propsPlano) {}

    public static construir(
        nome: string,
        valor: number,
        periodicidade: string,
        funcionalidades: string[] | null,
    ): Plano {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!nome || !periodicidade || !Number.isFinite(valor)) {
            throw new Error('Nome, valor e periodicidade são obrigatórios.');
        }
        return new Plano({ id: null, nome, valor, periodicidade, funcionalidades });
    }

    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public static reconstruir(props: propsPlano): Plano {
        return new Plano(props);
    }

    public get id() { return this.props.id; }
    public get nome() { return this.props.nome; }
    public get valor() { return this.props.valor; }
    public get periodicidade() { return this.props.periodicidade; }
    public get funcionalidades() { return this.props.funcionalidades; }

    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
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
