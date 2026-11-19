// Valida o cabecalho Bearer e o JWT, e associa o identificador autenticado a requisicao antes de liberar rotas protegidas.
import { HttpError } from './http-error';
import { readTokenSubject } from './jwt';
// Define um valor compartilhado usado pelas chamadas desta camada.
export const authMiddleware = (request, _response, next) => {
    const authorization = request.get('authorization');
    const token = authorization?.startsWith('Bearer ')
        ? authorization.slice('Bearer '.length)
        : '';
    // Verifica a condicao antes de prosseguir para o fluxo alternativo.
    if (!token) {
        next(new HttpError(401, 'Token de autenticação não informado.'));
        return;
    }
    // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
    try {
        const userId = readTokenSubject(token);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!userId || !/^[1-9]\d*$/.test(userId)) {
            next(new HttpError(401, 'Token de autenticação inválido.'));
            return;
        }
        request.userId = userId;
        next();
    }
    catch (error) {
        if (error instanceof Error
            && ['JsonWebTokenError', 'NotBeforeError', 'TokenExpiredError'].includes(error.name)) {
            next(new HttpError(401, 'Token inválido ou expirado.'));
            return;
        }
        next(error);
    }
};
//# sourceMappingURL=auth.middleware.js.map