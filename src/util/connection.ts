import { Pool } from 'pg';

const port = Number(process.env.DB_PORT ?? 5432);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('DB_PORT precisa ser um número entre 1 e 65535.');
}

export const connection = new Pool({
  host: process.env.DB_HOST ?? 'localhost',
  port,
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'postgres',
});
