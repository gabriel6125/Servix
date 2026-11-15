import { Router } from 'express';
import { usuarioController } from '../controller/usuario.controller';
import { authMiddleware } from '../../../../util/auth.middleware';

const usuarioRoutes = Router();

usuarioRoutes
    .route('/')
    .post(async (req, res) => usuarioController.registrar(req, res));

usuarioRoutes
    .route('/login')
    .post(async (req, res) => usuarioController.login(req, res));

usuarioRoutes
    .route('/me')
    .all(authMiddleware)
    .get(async (req, res) => usuarioController.buscarMeuPerfil(req, res))
    .patch(async (req, res) => usuarioController.atualizarMeuPerfil(req, res))
    .delete(async (req, res) => usuarioController.excluirMeuPerfil(req, res));

export default usuarioRoutes;