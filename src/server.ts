import 'dotenv/config';
import { app } from './app';
import { connection } from './util/connection';
import { assertJwtConfiguration } from './util/jwt';

async function start(): Promise<void> {
    // A API exige uma conexão PostgreSQL e uma chave JWT configurada.
    if (!process.env.DATABASE_URL && !process.env.PGHOST) {
        throw new Error('Configure DATABASE_URL ou PGHOST para conectar ao PostgreSQL.');
    }
    assertJwtConfiguration();
    // Executa a consulta usando o pool compartilhado de conexoes.
    await connection.query('SELECT 1');

    const port = Number(process.env.PORT ?? 3000);
    // Verifica a condicao antes de prosseguir para o fluxo alternativo.
    if (!Number.isInteger(port) || port < 0 || port > 65535) {
        throw new Error('PORT deve ser um número inteiro entre 0 e 65535.');
    }

    await new Promise<void>((resolve, reject) => {
        const listener = app.listen(port, () => {
            listener.off('error', reject);
            console.log(`API Servix disponível em http://localhost:${port}`);
            resolve();
        });
        listener.once('error', reject);
    });
}

void start().catch(async (error: unknown) => {
    console.error('Não foi possível iniciar a API Servix:', error);
    // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
    try {
        await connection.end();
    } catch (closeError) {
        console.error('Não foi possível fechar o pool do PostgreSQL:', closeError);
    }
    process.exitCode = 1;
});
