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
import relatorioRoutes from './relatorio.routes';
const router = Router();
router.get('/', (_request, response) => response.send('Olá, Dev'));
router.get('/health', async (_request, response, next) => {
    // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
    try {
        // Executa a consulta usando o pool compartilhado de conexoes.
        await connection.query('SELECT 1');
        return response.status(200).json({ status: 'ok', database: 'ok' });
    }
    catch (error) {
        return next(error);
    }
});
// Link público de orçamento: não exige autenticação do usuário que criou o orçamento.
router.get('/orcamentos/publico/:id', async (request, response, next) => {
    try {
        const result = await connection.query(`select id, servico_id, valor_pecas, valor_mao_de_obra,
                    outros_custos, valor_total, status, link_acesso
             from orcamento
             where id = $1 and status in ('Enviado', 'Aprovado', 'Recusado')`, [request.params.id]);
        if (!result.rows[0]) {
            response.status(404).json({ error: { message: 'Orçamento público não encontrado.' } });
            return;
        }
        response.json(result.rows[0]);
    }
    catch (error) {
        next(error);
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
router.use('/relatorios', authMiddleware, relatorioRoutes);
// Atalho direto usado pelo frontend para visualizar o dashboard.
router.use('/dashboard', authMiddleware, relatorioRoutes);
export default router;
//# sourceMappingURL=index.js.map