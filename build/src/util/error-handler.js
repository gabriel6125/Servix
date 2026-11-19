import { HttpError } from './http-error';
// Middleware executado quando nenhuma rota registrada atende a requisição.
export const notFoundHandler = (_request, _response, next) => {
    // Encaminha o erro ao middleware principal em vez de montar a resposta diretamente aqui.
    next(new HttpError(404, 'Rota não encontrada.'));
};
// Função compartilhada que decide qual resposta HTTP será enviada para um erro.
export function responderErro(error, response) {
    // Erros da aplicação já informam explicitamente o status e a mensagem esperados.
    if (error instanceof HttpError) {
        response.status(error.status).json({ error: { message: error.message } });
        return;
    }
    // Express e parsers podem anexar um identificador ao erro recebido.
    const errorType = getErrorType(error);
    // entity.parse.failed indica que o corpo enviado não era JSON válido.
    if (errorType === 'entity.parse.failed') {
        response.status(400).json({ error: { message: 'O JSON enviado é inválido.' } });
        return;
    }
    // entity.too.large indica que o limite de tamanho do corpo da requisição foi excedido.
    if (errorType === 'entity.too.large') {
        response.status(413).json({ error: { message: 'O corpo da requisição excede o limite.' } });
        return;
    }
    // PG e pg carregam o código SQL em error.code; ele permite distinguir falhas do banco.
    const code = getDatabaseCode(error);
    // 23505: violação de restrição UNIQUE.
    if (code === '23505') {
        response.status(409).json({ error: { message: 'Já existe um registro com esses dados.' } });
        return;
    }
    // 23503: FOREIGN KEY impede criação ou exclusão do registro.
    if (code === '23503') {
        response.status(409).json({ error: { message: 'O registro está relacionado a outros dados e não pode ser removido.' } });
        return;
    }
    // 23502 NOT NULL, 22P02 tipo inválido e 22003 número fora da faixa.
    if (code === '23502' || code === '22P02' || code === '22003') {
        response.status(400).json({ error: { message: 'Os dados enviados são inválidos ou incompletos.' } });
        return;
    }
    // Erros não reconhecidos são registrados no servidor e não expõem detalhes internos ao cliente.
    console.error('Erro não tratado na API:', error);
    response.status(500).json({ error: { message: 'Erro interno do servidor.' } });
}
// Middleware do Express responsável por capturar erros enviados por next(error).
export const errorHandler = (error, _request, response, _next) => {
    // O terceiro argumento é obrigatório pela assinatura do Express, mas não é usado aqui.
    void _next;
    // Delega a classificação e o formato da resposta à função compartilhada.
    responderErro(error, response);
};
// Extrai com segurança o código SQL de erros que podem ter formatos diferentes.
function getDatabaseCode(error) {
    // Garante que o valor seja um objeto antes de tentar acessar properties.
    if (error !== null
        && typeof error === 'object'
        && 'code' in error
        && typeof error.code === 'string') {
        // Retorna somente o código reconhecido como texto.
        return error.code;
    }
    // Nenhum código PostgreSQL foi informado ou encontrado.
    return undefined;
}
// Extrai o identificador de tipo enviado por erros de parsing ou tamanho do Express.
function getErrorType(error) {
    // Uma biblioteca pode informar o tipo do erro sem fornecer uma instância conhecida.
    if (error !== null
        && typeof error === 'object'
        && 'type' in error
        && typeof error.type === 'string') {
        // O texto retornado permite reconhecer falhas específicas de parsing.
        return error.type;
    }
    // Quando não existe type, o fluxo segue para os demais classificadores.
    return undefined;
}
//# sourceMappingURL=error-handler.js.map