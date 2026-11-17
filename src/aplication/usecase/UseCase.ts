// Define o contrato esperado pelas implementacoes.
export interface UseCase<Input, Output> {
    execute(input: Input): Promise<Output>;
}