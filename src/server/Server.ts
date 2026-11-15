import express from 'express';
import router from './routes/index';
import { errorHandler, notFoundHandler } from '../util/error-handler';

const server = express();

server.use(express.json());

server.use(router);
server.use(notFoundHandler);
server.use(errorHandler);

export { server };