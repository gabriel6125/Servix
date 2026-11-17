// Gera refresh tokens, calcula hashes para persistencia e define o prazo de validade da sessao.

import { createHash, randomBytes } from 'node:crypto';

// Define um valor compartilhado usado pelas chamadas desta camada.
export const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// Implementa uma operacao reutilizavel deste modulo.
export function createRefreshToken(): string {
    return randomBytes(32).toString('hex');
}

// Implementa uma operacao reutilizavel deste modulo.
export function hashRefreshToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
}
