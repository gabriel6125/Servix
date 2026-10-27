import { Router } from 'express';
import {
  atualizarPerfil,
  consultarPerfil,
  criar,
  excluirPerfil,
  login,
} from '../controller/usuario.controller.js';
import { autenticar } from '../middleware/autenticar.middleware.js';
import { validarDto } from '../middleware/validar-dto.middleware.js';
import {
  CreateUsuarioDto,
  LoginUsuarioDto,
  UpdateUsuarioDto,
} from '../dto/usuario.dto.js';

const usuarioRoutes = Router();

usuarioRoutes.post('/', validarDto(CreateUsuarioDto), criar);
usuarioRoutes.post('/login', validarDto(LoginUsuarioDto), login);
usuarioRoutes.get('/me', autenticar, consultarPerfil);
usuarioRoutes.patch(
  '/me',
  autenticar,
  validarDto(UpdateUsuarioDto),
  atualizarPerfil,
);
usuarioRoutes.delete('/me', autenticar, excluirPerfil);

export default usuarioRoutes;
