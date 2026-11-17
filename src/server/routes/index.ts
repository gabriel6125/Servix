import { Router } from 'express';
import { connection } from '../../util/connection';
import { authMiddleware } from '../../util/auth.middleware';
import assinaturaRoutes from './assinatura.routes';
import clienteRoutes from './cliente.routes';
import despesaRoutes from './despesa.routes';
import diagnosticoRoutes from './diagnostico.routes';
import orcamentoRoutes from './orcamento.routes';
import pagamentoRoutes from './pagamento.routes';
import planoRoutes from './plano.routes';
import servicoRoutes from './servico.routes';
import usuarioRoutes from './usuario.routes';

const router = Router();

router.get('/', (_request, response) => response.send('Olá, Dev'));

router.get('/health', async (_request, response, next) => {
    // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
    try {
        // Executa a consulta usando o pool compartilhado de conexoes.
        await connection.query('SELECT 1');
        return response.status(200).json({ status: 'ok', database: 'ok' });
    } catch (error) {
        return next(error);
    }
});

router.use('/usuarios', usuarioRoutes);
router.use('/assinaturas', authMiddleware, assinaturaRoutes);
router.use('/clientes', authMiddleware, clienteRoutes);
router.use('/despesas', authMiddleware, despesaRoutes);
router.use('/diagnosticos', authMiddleware, diagnosticoRoutes);
router.use('/orcamentos', authMiddleware, orcamentoRoutes);
router.use('/pagamentos', authMiddleware, pagamentoRoutes);
router.use('/planos', authMiddleware, planoRoutes);
router.use('/servicos', authMiddleware, servicoRoutes);

export default router;