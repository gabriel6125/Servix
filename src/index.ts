import 'dotenv/config';
import { server } from './server/Server';
import { connection } from './util/connection';
import { assertJwtConfiguration } from './util/jwt';

async function start(): Promise<void> {
    if (!process.env.DATABASE_URL && !process.env.PGHOST) {
        throw new Error('Configure DATABASE_URL ou PGHOST para conectar ao PostgreSQL.');
    }
    assertJwtConfiguration();
    await connection.query('SELECT 1');

    const port = Number(process.env.PORT ?? 3000);
    if (!Number.isInteger(port) || port < 0 || port > 65535) {
        throw new Error('PORT deve ser um número inteiro entre 0 e 65535.');
    }

    await new Promise<void>((resolve, reject) => {
        const listener = server.listen(port, () => {
            listener.off('error', reject);
            console.log(`API Servix disponível em http://localhost:${port}`);
            resolve();
        });
        listener.once('error', reject);
    });
}

void start().catch(async (error: unknown) => {
    console.error('Não foi possível iniciar a API Servix:', error);
    try {
        await connection.end();
    } catch (closeError) {
        console.error('Não foi possível fechar o pool do PostgreSQL:', closeError);
    }
    process.exitCode = 1;
});
