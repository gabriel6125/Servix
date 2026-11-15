import { Router } from 'express';
import { diagnosticoController } from '../../infra/web/express/controller/diagnostico.controller';

const diagnosticoRoutes = Router();

diagnosticoRoutes
    .route('/')
    .get(async (req, res) => diagnosticoController.listar(req, res))
    .post(async (req, res) => diagnosticoController.salvar(req, res));

diagnosticoRoutes
    .route('/:id')
    .get(async (req, res) => diagnosticoController.buscarPorId(req, res))
    .put(async (req, res) => diagnosticoController.atualizar(req, res))
    .delete(async (req, res) => diagnosticoController.deletar(req, res));

export default diagnosticoRoutes;
