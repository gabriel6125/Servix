import { Router } from 'express';
import { servicoController } from '../controller/servico.controller';

const servicoRoutes = Router();

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