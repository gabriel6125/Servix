export type propsDiagnostico = {
    id: string | null;
    servicoId: string;
    problemaIdentificado: string;
    observacoes: string | null;
};

export class Diagnostico {
    private constructor(private props: propsDiagnostico) {}

    public static construir(
        servicoId: string,
        problemaIdentificado: string,
        observacoes: string | null,
    ): Diagnostico {
        if (!servicoId || !problemaIdentificado) {
            throw new Error('Serviço e problema identificado são obrigatórios.');
        }
        return new Diagnostico({ id: null, servicoId, problemaIdentificado, observacoes });
    }

    public static reconstruir(props: propsDiagnostico): Diagnostico {
        return new Diagnostico(props);
    }

    public get id() { return this.props.id; }
    public get servicoId() { return this.props.servicoId; }
    public get problemaIdentificado() { return this.props.problemaIdentificado; }
    public get observacoes() { return this.props.observacoes; }

    public toJSON() {
        return {
            id: this.id,
            servico_id: this.servicoId,
            problema_identificado: this.problemaIdentificado,
            observacoes: this.observacoes,
        };
    }
}
