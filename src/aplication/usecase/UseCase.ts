// Contrato genérico para um caso de uso.
// `InputDTO` e `OutputDTO` são parâmetros de tipo: cada implementação informa
// seus próprios formatos sem duplicar a definição do método `execute`.
export interface UseCase<InputDTO, OutputDTO>{
    // Recebe um DTO, executa a operação e resolve com o DTO de saída.
    execute (input: InputDTO): Promise<OutputDTO>
}