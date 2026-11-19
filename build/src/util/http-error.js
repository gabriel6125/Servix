// Define o comportamento e os dados desta classe.
export class HttpError extends Error {
    // Inicializa os dados internos exigidos por esta classe.
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}
//# sourceMappingURL=http-error.js.map