import { Router } from 'express';
import { pagamentoController } from '../../infra/web/express/controller/pagamento.controller';
const pagamentoRoutes = Router();
pagamentoRoutes
    .route('/')
    .get(async (req, res) => pagamentoController.listar(req, res))
    .post(async (req, res) => pagamentoController.salvar(req, res));
pagamentoRoutes
    .route('/:id')
    .get(async (req, res) => pagamentoController.buscarPorId(req, res))
    .put(async (req, res) => pagamentoController.atualizar(req, res))
    .delete(async (req, res) => pagamentoController.deletar(req, res));
export default pagamentoRoutes;
//# sourceMappingURL=pagamento.routes.js.map