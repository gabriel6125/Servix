CREATE TABLE IF NOT EXISTS refresh_token (
    token_hash CHAR(64) PRIMARY KEY,
    usuario_id BIGINT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS refresh_token_usuario_id_idx ON refresh_token(usuario_id);
CREATE INDEX IF NOT EXISTS refresh_token_expires_at_idx ON refresh_token(expires_at);
