import { Router } from 'express';
import { assinaturaController } from '../../infra/web/express/controller/assinatura.controller';

const assinaturaRoutes = Router();

assinaturaRoutes
    .route('/')
    .get(async (req, res) => assinaturaController.listar(req, res))
    .post(async (req, res) => assinaturaController.salvar(req, res));

assinaturaRoutes
    .route('/:id')
    .get(async (req, res) => assinaturaController.buscarPorId(req, res))
    .put(async (req, res) => assinaturaController.atualizar(req, res))
    .delete(async (req, res) => assinaturaController.deletar(req, res));

export default assinaturaRoutes;
