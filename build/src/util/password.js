import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
const KEY_LENGTH = 64;
export async function hashPassword(password) {
    const salt = randomBytes(16);
    // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
    const key = await deriveKey(password, salt);
    return `scrypt$${salt.toString('hex')}$${key.toString('hex')}`;
}
export async function verifyPassword(password, hash) {
    const [algorithm, saltHex, keyHex] = hash.split('$');
    if (algorithm !== 'scrypt'
        || !saltHex
        || !keyHex
        || !/^[a-f\d]+$/i.test(saltHex)
        || !/^[a-f\d]+$/i.test(keyHex)) {
        return false;
    }
    const expected = Buffer.from(keyHex, 'hex');
    // Verifica a condicao antes de prosseguir para o fluxo alternativo.
    if (expected.length !== KEY_LENGTH) {
        return false;
    }
    return timingSafeEqual(await deriveKey(password, Buffer.from(saltHex, 'hex')), expected);
}
function deriveKey(password, salt) {
    return new Promise((resolve, reject) => {
        scrypt(password, salt, KEY_LENGTH, (error, key) => {
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (error) {
                reject(error);
                return;
            }
            resolve(key);
        });
    });
}
//# sourceMappingURL=password.js.map