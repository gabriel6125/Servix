import { sign, verify } from 'jsonwebtoken';

export function createToken(userId: string): string {
    return sign({ sub: userId }, getSecret(), { expiresIn: '1h' });
}

export function readTokenSubject(token: string): string | undefined {
    const payload = verify(token, getSecret());
    if (typeof payload === 'string' || typeof payload.sub !== 'string') {
        return undefined;
    }
    return payload.sub;
}

export function assertJwtConfiguration(): void {
    getSecret();
}

function getSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error('Configure JWT_SECRET com pelo menos 32 caracteres.');
    }
    return secret;
}
