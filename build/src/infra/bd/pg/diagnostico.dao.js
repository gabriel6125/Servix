import { connection } from '../../../util/connection';
import { Diagnostico } from '../../../dominio/entidades/diagnostico';
// Define o comportamento e os dados desta classe.
export class DiagnosticoDao {
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(diagnostico, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`insert into diagnostico (servico_id, problema_identificado, observacoes)
             select $1, $2, $3
             where exists (
                 select 1 from servico where id = $1 and usuario_id = $4
             )
             returning id, servico_id, problema_identificado, observacoes`, [
            diagnostico.servicoId,
            diagnostico.problemaIdentificado,
            diagnostico.observacoes,
            usuarioId,
        ]);
        // Verifica a condicao antes de prosseguir para o fluxo alternativo.
        if (!result.rows[0]) {
            return null;
        }
        return this.mapearDiagnostico(result.rows[0]);
    }
    // Metodo buscarPorId: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async buscarPorId(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`select d.id, d.servico_id, d.problema_identificado, d.observacoes
             from diagnostico d
             inner join servico s on s.id = d.servico_id
             where d.id = $1 and s.usuario_id = $2`, [id, usuarioId]);
        return result.rows[0] ? this.mapearDiagnostico(result.rows[0]) : null;
    }
    // Metodo listar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async listar(usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`select d.id, d.servico_id, d.problema_identificado, d.observacoes
             from diagnostico d
             inner join servico s on s.id = d.servico_id
             where s.usuario_id = $1 order by d.id`, [usuarioId]);
        return result.rows.map((row) => this.mapearDiagnostico(row));
    }
    // Metodo atualizar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async atualizar(diagnostico, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`update diagnostico
             set servico_id = $1, problema_identificado = $2, observacoes = $3
             where id = $4 and exists (
                 select 1 from servico
                 where id = diagnostico.servico_id and usuario_id = $5
             )
             returning id, servico_id, problema_identificado, observacoes`, [
            diagnostico.servicoId,
            diagnostico.problemaIdentificado,
            diagnostico.observacoes,
            diagnostico.id,
            usuarioId,
        ]);
        return result.rows[0] ? this.mapearDiagnostico(result.rows[0]) : null;
    }
    // Metodo excluir: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async excluir(id, usuarioId) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const result = await connection.query(`delete from diagnostico d
             using servico s
             where d.servico_id = s.id and d.id = $1 and s.usuario_id = $2`, [id, usuarioId]);
        return (result.rowCount ?? 0) > 0;
    }
    // Metodo mapearDiagnostico: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    mapearDiagnostico(row) {
        const props = {
            id: String(row.id),
            servicoId: String(row.servico_id),
            problemaIdentificado: String(row.problema_identificado),
            observacoes: row.observacoes === null ? null : String(row.observacoes),
        };
        return Diagnostico.reconstruir(props);
    }
}
//# sourceMappingURL=diagnostico.dao.js.map