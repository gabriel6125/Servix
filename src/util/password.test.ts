import assert from 'node:assert/strict';
import test from 'node:test';
import { hashPassword, verifyPassword } from './password';

test('hashes and verifies a password', async () => {
    const hash = await hashPassword('senhaSegura123');
    assert.equal(await verifyPassword('senhaSegura123', hash), true);
    assert.equal(await verifyPassword('senhaErrada', hash), false);
});
