// Define o formato dos dados usados nesta parte da aplicacao.
export type propsUsuario = {
    id: string | null;
    nome: string;
    email: string;
    senha: string;
};

// Define o comportamento e os dados desta classe.
export class Usuario {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    private constructor(private props: propsUsuario) {}

    public static construir(nome: string, email: string, senha: string): Usuario {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!nome || !email || !senha) {
            throw new Error('Nome, e-mail e senha são obrigatórios.');
        }
        return new Usuario({ id: null, nome, email, senha });
    }

    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public static reconstruir(props: propsUsuario): Usuario {
        return new Usuario(props);
    }

    public get id() { return this.props.id; }
    public get nome() { return this.props.nome; }
    public get email() { return this.props.email; }
    public get senha() { return this.props.senha; }

    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public toJSON() {
        return { id: this.id, nome: this.nome, email: this.email };
    }
}
