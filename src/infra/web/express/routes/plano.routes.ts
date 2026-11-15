import { Router } from 'express';
import { planoController } from '../controller/plano.controller';

const planoRoutes = Router();

planoRoutes
    .route('/')
    .get(async (req, res) => planoController.listar(req, res))
    .post(async (req, res) => planoController.salvar(req, res));

planoRoutes
    .route('/:id')
    .get(async (req, res) => planoController.buscarPorId(req, res))
    .put(async (req, res) => planoController.atualizar(req, res))
    .delete(async (req, res) => planoController.deletar(req, res));

export default planoRoutes;