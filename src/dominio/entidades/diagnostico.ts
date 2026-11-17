// Define o formato dos dados usados nesta parte da aplicacao.
export type propsDiagnostico = {
    id: string | null;
    servicoId: string;
    problemaIdentificado: string;
    observacoes: string | null;
};

// Define o comportamento e os dados desta classe.
export class Diagnostico {
    // Metodo constructor: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    private constructor(private props: propsDiagnostico) {}

    public static construir(
        servicoId: string,
        problemaIdentificado: string,
        observacoes: string | null,
    ): Diagnostico {
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!servicoId || !problemaIdentificado) {
            throw new Error('Serviço e problema identificado são obrigatórios.');
        }
        return new Diagnostico({ id: null, servicoId, problemaIdentificado, observacoes });
    }

    // Metodo reconstruir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public static reconstruir(props: propsDiagnostico): Diagnostico {
        return new Diagnostico(props);
    }

    public get id() { return this.props.id; }
    public get servicoId() { return this.props.servicoId; }
    public get problemaIdentificado() { return this.props.problemaIdentificado; }
    public get observacoes() { return this.props.observacoes; }

    // Metodo toJSON: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    public toJSON() {
        return {
            id: this.id,
            servico_id: this.servicoId,
            problema_identificado: this.problemaIdentificado,
            observacoes: this.observacoes,
        };
    }
}
