import 'dotenv/config';
import { Pool, type PoolConfig } from 'pg';

const config: PoolConfig = process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {};

if (process.env.PGHOST) config.host = process.env.PGHOST;
if (process.env.PGPORT) config.port = Number(process.env.PGPORT);
if (process.env.PGUSER) config.user = process.env.PGUSER;
if (process.env.PGPASSWORD) config.password = process.env.PGPASSWORD;
if (process.env.PGDATABASE) config.database = process.env.PGDATABASE;
if (process.env.PGSSLMODE === 'require') {
    config.ssl = {
        rejectUnauthorized: process.env.PGSSL_REJECT_UNAUTHORIZED !== 'false',
    };
}

export const connection = new Pool(config);

connection.on('error', (error: Error) => {
    console.error('Erro inesperado na conexão com o PostgreSQL:', error);
});