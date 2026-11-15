import { server } from './server/Server';
import { assertJwtConfiguration } from './util/jwt';

if (!process.env.DATABASE_URL && !process.env.PGHOST) {
    throw new Error('Configure DATABASE_URL ou PGHOST para conectar ao PostgreSQL.');
}
assertJwtConfiguration();

const port = Number(process.env.PORT ?? 3000);
server.listen(port, () => console.log(`API Servix disponível em http://localhost:${port}`));