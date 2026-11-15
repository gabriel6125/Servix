import express from 'express';
import routes from '../infra/web/express/routes';
import { errorHandler, notFoundHandler } from '../util/error-handler';
import { connection } from '../util/connection';
import type { Request, Response, RequestHandler } from 'express';

const server = express();

server.disable('x-powered-by');
server.use(express.json({ limit: '1mb' }));

const healthCheck: RequestHandler = async (_request: Request, response: Response) => {
    await connection.query('SELECT 1');
    response.json({ status: 'ok' });
};

server.get('/api/health', healthCheck);
server.use('/api', routes);
server.use(notFoundHandler);
server.use(errorHandler);

export { server };