import { Router } from 'express';
import { authMiddleware } from '../../../../util/auth.middleware';
import assinaturaRoutes from './assinatura.routes';
import clienteRoutes from './cliente.routes';
import despesaRoutes from './despesa.routes';
import diagnosticoRoutes from './diagnostico.routes';
import orcamentoRoutes from './orcamento.routes';
import pagamentoRoutes from './pagamento.routes';
import planoRoutes from './plano.routes';
import servicoRoutes from './servico.routes';
import usuarioRoutes from './usuario.routes';

const routes = Router();

routes.use('/usuarios', usuarioRoutes);
routes.use('/assinaturas', authMiddleware, assinaturaRoutes);
routes.use('/clientes', authMiddleware, clienteRoutes);
routes.use('/despesas', authMiddleware, despesaRoutes);
routes.use('/diagnosticos', authMiddleware, diagnosticoRoutes);
routes.use('/orcamentos', authMiddleware, orcamentoRoutes);
routes.use('/pagamentos', authMiddleware, pagamentoRoutes);
routes.use('/planos', authMiddleware, planoRoutes);
routes.use('/servicos', authMiddleware, servicoRoutes);

export default routes;