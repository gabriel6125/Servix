import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

const KEY_LENGTH = 64;

export async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16);
    const key = await deriveKey(password, salt);
    return `scrypt$${salt.toString('hex')}$${key.toString('hex')}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    const [algorithm, saltHex, keyHex] = hash.split('$');
    if (
        algorithm !== 'scrypt'
        || !saltHex
        || !keyHex
        || !/^[a-f\d]+$/i.test(saltHex)
        || !/^[a-f\d]+$/i.test(keyHex)
    ) {
        return false;
    }

    const expected = Buffer.from(keyHex, 'hex');
    if (expected.length !== KEY_LENGTH) {
        return false;
    }
    return timingSafeEqual(await deriveKey(password, Buffer.from(saltHex, 'hex')), expected);
}

function deriveKey(password: string, salt: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        scrypt(password, salt, KEY_LENGTH, (error, key) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(key);
        });
    });
}
