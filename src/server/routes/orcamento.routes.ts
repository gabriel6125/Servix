import { Router } from 'express';
import { orcamentoController } from '../../infra/web/express/controller/orcamento.controller';

const orcamentoRoutes = Router();

// Gera um link público reutilizável e disponibiliza o orçamento.
orcamentoRoutes
    .route('/:id/enviar')
    .post(async (req, res) => orcamentoController.enviar(req, res));

// Registra explicitamente a decisão do cliente.
orcamentoRoutes
    .route('/:id/decisao')
    .post(async (req, res) => orcamentoController.registrarDecisao(req, res));

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
