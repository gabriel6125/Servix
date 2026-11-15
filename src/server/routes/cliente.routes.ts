import { Router } from 'express';
import { clienteController } from '../../infra/web/express/controller/cliente.controller';

const clienteRoutes = Router();

clienteRoutes
    .route('/')
    .get(async (req, res) => clienteController.listar(req, res))
    .post(async (req, res) => clienteController.salvar(req, res));

clienteRoutes
    .route('/:id')
    .get(async (req, res) => clienteController.buscarPorId(req, res))
    .put(async (req, res) => clienteController.atualizar(req, res))
    .delete(async (req, res) => clienteController.deletar(req, res));

export default clienteRoutes;
