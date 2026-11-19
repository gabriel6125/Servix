import { Router } from 'express';
import { despesaController } from '../../infra/web/express/controller/despesa.controller';
const despesaRoutes = Router();
despesaRoutes
    .route('/')
    .get(async (req, res) => despesaController.listar(req, res))
    .post(async (req, res) => despesaController.salvar(req, res));
despesaRoutes
    .route('/:id')
    .get(async (req, res) => despesaController.buscarPorId(req, res))
    .put(async (req, res) => despesaController.atualizar(req, res))
    .delete(async (req, res) => despesaController.deletar(req, res));
export default despesaRoutes;
//# sourceMappingURL=despesa.routes.js.map