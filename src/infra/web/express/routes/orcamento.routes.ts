import { Router } from 'express';
import { orcamentoController } from '../controller/orcamento.controller';

const orcamentoRoutes = Router();

orcamentoRoutes
    .route('/')
    .get(async (req, res) => orcamentoController.listar(req, res))
    .post(async (req, res) => orcamentoController.salvar(req, res));

orcamentoRoutes
    .route('/:id')
    .get(async (req, res) => orcamentoController.buscarPorId(req, res))
    .put(async (req, res) => orcamentoController.atualizar(req, res))
    .delete(async (req, res) => orcamentoController.deletar(req, res));

export default orcamentoRoutes;