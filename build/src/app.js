import express from 'express';
import router from './server/routes/index';
import { errorHandler, notFoundHandler } from './util/error-handler';
const app = express();
app.use(express.json());
// Todas as regras de roteamento ficam centralizadas em server/routes.
app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);
export { app };
//# sourceMappingURL=app.js.map