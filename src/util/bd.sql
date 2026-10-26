-- 1. Tabela Usuario
CREATE TABLE usuario (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- 2. Tabela Plano
CREATE TABLE plano (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    periodicidade VARCHAR(50) NOT NULL,
    funcionalidades TEXT[] -- Mapeia a List<String> do diagrama
);

-- 3. Tabela Assinatura (Relacionada com Usuario e Plano)
CREATE TABLE assinatura (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    plano_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    CONSTRAINT fk_assinatura_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    CONSTRAINT fk_assinatura_plano FOREIGN KEY (plano_id) REFERENCES plano(id) ON DELETE RESTRICT
);

-- 4. Tabela Cliente (Gerenciado por Usuario)
CREATE TABLE cliente (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(50),
    email VARCHAR(255),
    CONSTRAINT fk_cliente_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- 5. Tabela Servico (Solicitado por Cliente e gerenciado por Usuario)
CREATE TABLE servico (
    id BIGSERIAL PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    descricao TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    data_prevista DATE,
    data_conclusao DATE,
    CONSTRAINT fk_servico_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    CONSTRAINT fk_servico_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- 6. Tabela Despesa (Registrada por Usuario)
CREATE TABLE despesa (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    descricao TEXT NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    data_despesa DATE NOT NULL,
    CONSTRAINT fk_despesa_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- 7. Tabela Diagnostico (Relação 1 para 0..1 com Servico)
CREATE TABLE diagnostico (
    id BIGSERIAL PRIMARY KEY,
    servico_id BIGINT NOT NULL UNIQUE, -- UNIQUE garante a cardinalidade 0..1
    problema_identificado TEXT NOT NULL,
    observacoes TEXT,
    CONSTRAINT fk_diagnostico_servico FOREIGN KEY (servico_id) REFERENCES servico(id) ON DELETE CASCADE
);

-- 8. Tabela Orcamento (Relação 1 para 0..1 com Servico)
CREATE TABLE orcamento (
    id BIGSERIAL PRIMARY KEY,
    servico_id BIGINT NOT NULL UNIQUE, -- UNIQUE garante a cardinalidade 0..1
    valor_pecas NUMERIC(10, 2) DEFAULT 0.00,
    valor_mao_de_obra NUMERIC(10, 2) DEFAULT 0.00,
    outros_custos NUMERIC(10, 2) DEFAULT 0.00,
    valor_total NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    link_acesso VARCHAR(500),
    CONSTRAINT fk_orcamento_servico FOREIGN KEY (servico_id) REFERENCES servico(id) ON DELETE CASCADE
);

-- 9. Tabela Pagamento (Relação 1 para N com Servico)
CREATE TABLE pagamento (
    id BIGSERIAL PRIMARY KEY,
    servico_id BIGINT NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    data_pagamento DATE NOT NULL,
    CONSTRAINT fk_pagamento_servico FOREIGN KEY (servico_id) REFERENCES servico(id) ON DELETE CASCADE
);