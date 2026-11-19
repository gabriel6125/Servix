import jwt from 'jsonwebtoken';
// Implementa uma operacao reutilizavel deste modulo.
export function createToken(userId) {
    return jwt.sign({ sub: userId }, getSecret(), { expiresIn: '1h' });
}
// Implementa uma operacao reutilizavel deste modulo.
export function readTokenSubject(token) {
    const payload = jwt.verify(token, getSecret());
    // Verifica a condicao antes de prosseguir para o fluxo alternativo.
    if (typeof payload === 'string' || typeof payload.sub !== 'string') {
        return undefined;
    }
    return payload.sub;
}
// Implementa uma operacao reutilizavel deste modulo.
export function assertJwtConfiguration() {
    getSecret();
}
function getSecret() {
    const secret = process.env.JWT_SECRET;
    // Verifica a condicao antes de prosseguir para o fluxo alternativo.
    if (!secret || secret.length < 32) {
        throw new Error('Configure JWT_SECRET com pelo menos 32 caracteres.');
    }
    return secret;
}
//# sourceMappingURL=jwt.js.map