import express from 'express';
import routes from './routes/index.js';
import { tratarErro } from './middleware/erro.middleware.js';

const app = express();

app.use(express.json());
app.use(routes);
app.use(tratarErro);

export default app;