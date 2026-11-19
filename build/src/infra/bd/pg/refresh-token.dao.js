import { connection } from '../../../util/connection';
// Define o comportamento e os dados desta classe.
export class RefreshTokenDao {
    // Metodo salvar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async salvar(usuarioId, tokenHash, expiresAt) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const client = await connection.connect();
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Envia a consulta ao PostgreSQL e aguarda o resultado antes de continuar.
            await client.query('BEGIN');
            // Envia a consulta ao PostgreSQL e aguarda o resultado antes de continuar.
            await client.query('DELETE FROM refresh_token WHERE expires_at <= NOW()');
            // Envia a consulta ao PostgreSQL e aguarda o resultado antes de continuar.
            await client.query(`insert into refresh_token (token_hash, usuario_id, expires_at)
                 values ($1, $2, $3)`, [tokenHash, usuarioId, expiresAt]);
            // Envia a consulta ao PostgreSQL e aguarda o resultado antes de continuar.
            await client.query('COMMIT');
        }
        catch (error) {
            await this.reverterTransacao(client);
            throw error;
        }
        finally {
            client.release();
        }
    }
    // Metodo rotacionar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async rotacionar(tokenHash, novoTokenHash, expiresAt) {
        // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
        const client = await connection.connect();
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Envia a consulta ao PostgreSQL e aguarda o resultado antes de continuar.
            await client.query('BEGIN');
            // Envia a consulta ao PostgreSQL e aguarda o resultado antes de continuar.
            await client.query('DELETE FROM refresh_token WHERE expires_at <= NOW()');
            // Aguarda a operacao assincrona e armazena o resultado para o passo seguinte.
            const result = await client.query(`delete from refresh_token
                 where token_hash = $1 and expires_at > NOW()
                 returning usuario_id`, [tokenHash]);
            // Verifica a condicao antes de prosseguir para o fluxo alternativo.
            if (!result.rows[0]) {
                // Envia a consulta ao PostgreSQL e aguarda o resultado antes de continuar.
                await client.query('COMMIT');
                return null;
            }
            const usuarioId = String(result.rows[0].usuario_id);
            // Envia a consulta ao PostgreSQL e aguarda o resultado antes de continuar.
            await client.query(`insert into refresh_token (token_hash, usuario_id, expires_at)
                 values ($1, $2, $3)`, [novoTokenHash, usuarioId, expiresAt]);
            // Envia a consulta ao PostgreSQL e aguarda o resultado antes de continuar.
            await client.query('COMMIT');
            return usuarioId;
        }
        catch (error) {
            await this.reverterTransacao(client);
            throw error;
        }
        finally {
            client.release();
        }
    }
    // Metodo revogar: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async revogar(tokenHash) {
        // Executa a consulta usando o pool compartilhado de conexoes.
        await connection.query('DELETE FROM refresh_token WHERE token_hash = $1', [tokenHash]);
    }
    // Metodo reverterTransacao: executa esta etapa do fluxo e usa o estado ou os parametros recebidos.
    async reverterTransacao(client) {
        // Tenta executar a operacao; falhas sao capturadas no bloco catch abaixo.
        try {
            // Envia a consulta ao PostgreSQL e aguarda o resultado antes de continuar.
            await client.query('ROLLBACK');
        }
        catch (error) {
            console.error('Não foi possível reverter a transação de refresh token:', error);
        }
    }
}
//# sourceMappingURL=refresh-token.dao.js.map