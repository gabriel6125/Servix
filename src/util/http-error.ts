// Define o comportamento e os dados desta classe.
export class HttpError extends Error {
    // Inicializa os dados internos exigidos por esta classe.
    constructor(
        public readonly status: number,
        message: string,
    ) {
        super(message);
        this.name = 'HttpError';
    }
}
