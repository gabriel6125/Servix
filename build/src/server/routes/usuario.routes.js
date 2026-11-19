import { Router } from 'express';
import { authMiddleware } from '../../util/auth.middleware';
import { usuarioController } from '../../infra/web/express/controller/usuario.controller';
const usuarioRoutes = Router();
usuarioRoutes
    .route('/')
    .post(async (req, res) => usuarioController.registrar(req, res));
usuarioRoutes
    .route('/login')
    .post(async (req, res) => usuarioController.login(req, res));
usuarioRoutes
    .route('/refresh')
    .post(async (req, res) => usuarioController.renovarSessao(req, res));
// Solicita a recuperação da conta informando o e-mail do usuário.
usuarioRoutes
    .route('/recuperar-senha')
    .post(async (req, res) => usuarioController.solicitarRecuperacaoSenha(req, res));
// Converte um token válido de recuperação em uma nova senha.
usuarioRoutes
    .route('/redefinir-senha')
    .post(async (req, res) => usuarioController.redefinirSenha(req, res));
usuarioRoutes
    .route('/logout')
    .post(async (req, res) => usuarioController.logout(req, res));
usuarioRoutes
    .route('/me')
    .all(authMiddleware)
    .get(async (req, res) => usuarioController.buscarMeuPerfil(req, res))
    .patch(async (req, res) => usuarioController.atualizarMeuPerfil(req, res))
    .delete(async (req, res) => usuarioController.excluirMeuPerfil(req, res));
export default usuarioRoutes;
//# sourceMappingURL=usuario.routes.js.map