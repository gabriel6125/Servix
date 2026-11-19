import { Router } from 'express';
import { connection } from '../../util/connection';
const relatorioRoutes = Router();
function periodo(req) {
    const inicio = typeof req.query.inicio === 'string'
        ? req.query.inicio
        : typeof req.query.data_inicio === 'string' ? req.query.data_inicio : '1900-01-01';
    const fim = typeof req.query.fim === 'string'
        ? req.query.fim
        : typeof req.query.data_fim === 'string' ? req.query.data_fim : '2100-12-31';
    return { inicio, fim };
}
// Totais recebidos em pagamentos dentro do período informado.
relatorioRoutes.get('/receitas', async (req, res, next) => {
    try {
        const { inicio, fim } = periodo(req);
        const result = await connection.query(`select coalesce(sum(p.valor), 0)::float8 as total,
                    count(p.id)::integer as quantidade
             from pagamento p
             inner join servico s on s.id = p.servico_id
             where s.usuario_id = $1
               and p.data_pagamento between $2::date and $3::date`, [req.userId, inicio, fim]);
        res.json({ periodo: { inicio, fim }, receitas: result.rows[0].total, quantidade: result.rows[0].quantidade });
    }
    catch (error) {
        next(error);
    }
});
// Totais de despesas dentro do período informado.
relatorioRoutes.get('/despesas', async (req, res, next) => {
    try {
        const { inicio, fim } = periodo(req);
        const result = await connection.query(`select coalesce(sum(valor), 0)::float8 as total,
                    count(id)::integer as quantidade
             from despesa
             where usuario_id = $1
               and data_despesa between $2::date and $3::date`, [req.userId, inicio, fim]);
        res.json({ periodo: { inicio, fim }, despesas: result.rows[0].total, quantidade: result.rows[0].quantidade });
    }
    catch (error) {
        next(error);
    }
});
// Resumo financeiro: receitas, despesas, saldo e valores pendentes.
relatorioRoutes.get('/resumo', async (req, res, next) => {
    try {
        const { inicio, fim } = periodo(req);
        const result = await connection.query(`select
               (select coalesce(sum(p.valor), 0) from pagamento p
                inner join servico s on s.id = p.servico_id
                where s.usuario_id = $1
                  and p.data_pagamento between $2::date and $3::date) as receitas,
               (select coalesce(sum(d.valor), 0) from despesa d
                where d.usuario_id = $1
                  and d.data_despesa between $2::date and $3::date) as despesas,
               (select coalesce(sum(o.valor_total), 0) from orcamento o
                inner join servico s on s.id = o.servico_id
                where s.usuario_id = $1
                  and lower(o.status) in ('pendente', 'enviado', 'aguardando')) as pendente`, [req.userId, inicio, fim]);
        const receitas = Number(result.rows[0].receitas);
        const despesas = Number(result.rows[0].despesas);
        const pendente = Number(result.rows[0].pendente);
        res.json({
            periodo: { inicio, fim },
            receitas,
            despesas,
            saldo: receitas - despesas,
            valores_pendentes: pendente,
        });
    }
    catch (error) {
        next(error);
    }
});
// Visão consolidada dos principais indicadores do negócio.
relatorioRoutes.get('/', async (req, res, next) => {
    try {
        const result = await connection.query(`select
               (select count(*) from cliente where usuario_id = $1) as clientes,
               (select count(*) from servico where usuario_id = $1) as servicos,
               (select count(*) from servico where usuario_id = $1 and lower(status) not in ('concluido', 'cancelado')) as servicos_abertos,
               (select coalesce(sum(p.valor), 0) from pagamento p
                inner join servico s on s.id = p.servico_id
                where s.usuario_id = $1) as receitas,
               (select coalesce(sum(d.valor), 0) from despesa d
                where d.usuario_id = $1) as despesas`, [req.userId]);
        const row = result.rows[0];
        const receitas = Number(row.receitas);
        const despesas = Number(row.despesas);
        res.json({
            clientes: Number(row.clientes),
            servicos: Number(row.servicos),
            servicos_abertos: Number(row.servicos_abertos),
            receitas,
            despesas,
            saldo: receitas - despesas,
        });
    }
    catch (error) {
        next(error);
    }
});
export default relatorioRoutes;
//# sourceMappingURL=relatorio.routes.js.map