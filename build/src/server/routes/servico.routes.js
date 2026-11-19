import { Router } from 'express';
import { servicoController } from '../../infra/web/express/controller/servico.controller';
const servicoRoutes = Router();
// Alertas para prazos próximos ou vencidos.
servicoRoutes
    .route('/alertas-prazos')
    .get(async (req, res) => servicoController.alertasPrazo(req, res));
// Lista serviços associados ao cliente informado por parâmetro de consulta.
servicoRoutes
    .route('/por-cliente/:clienteId')
    .get(async (req, res) => servicoController.filtrarPorCliente(req, res));
// Alteração explícita do fluxo de execução do serviço.
servicoRoutes
    .route('/:id/status')
    .patch(async (req, res) => servicoController.alterarStatus(req, res));
servicoRoutes
    .route('/:id/finalizar')
    .post(async (req, res) => servicoController.finalizar(req, res));
servicoRoutes
    .route('/:id/cancelar')
    .post(async (req, res) => servicoController.cancelar(req, res));
servicoRoutes
    .route('/')
    .get(async (req, res) => servicoController.listar(req, res))
    .post(async (req, res) => servicoController.salvar(req, res));
servicoRoutes
    .route('/:id')
    .get(async (req, res) => servicoController.buscarPorId(req, res))
    .put(async (req, res) => servicoController.atualizar(req, res))
    .delete(async (req, res) => servicoController.deletar(req, res));
export default servicoRoutes;
//# sourceMappingURL=servico.routes.js.map