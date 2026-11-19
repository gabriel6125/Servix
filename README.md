# Servix API

API REST em Node.js, Express, TypeScript e PostgreSQL para gestão de usuários,
clientes, serviços, diagnósticos, orçamentos, pagamentos, despesas e assinaturas.

## Arquitetura

O projeto usa separação em camadas:

- `src/server`: composição do Express e definição das rotas HTTP.
- `src/infra/web/express/controller`: valida os dados da requisição e chama casos de uso.
- `src/aplication`: DTOs e casos de uso que representam as operações do negócio.
- `src/service`: regras de negócio independentes do protocolo HTTP.
- `src/dominio`: entidades e invariantes do domínio.
- `src/infra/bd/pg`: acesso ao PostgreSQL com consultas parametrizadas.
- `src/util`: autenticação JWT, refresh tokens, senha e tratamento de erros.

Um fluxo típico é:

`rota → controller → use case → service → DAO → PostgreSQL`

## Requisitos

- Node.js
- PostgreSQL

## Configuração local

1. Instale as dependências:

   ```sh
   npm install
   ```

2. Copie `.env.example` para `.env` e configure `DATABASE_URL` (ou as variáveis `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD` e `PGDATABASE`) e `JWT_SECRET`. O segredo JWT deve ter pelo menos 32 caracteres.

3. Crie o banco e aplique o schema:

   ```sh
   psql "$DATABASE_URL" -f src/util/db.sql
   psql "$DATABASE_URL" -f src/util/migrations/001_refresh_token.sql
   psql "$DATABASE_URL" -f src/util/migrations/002_password_reset.sql
   ```

   Execute o schema uma vez em um banco vazio. Se o schema já foi aplicado, execute somente a migração de refresh tokens.

4. Verifique a tipagem e inicie a API:

   ```sh
   npm run typecheck
   npm run dev
   ```

O servidor inicia somente depois de validar a configuração e conectar ao PostgreSQL. `GET /health` verifica a conexão com o banco.

## Rotas

Exceto login, registro e recuperação, as operações protegidas exigem:

`Authorization: Bearer <token>`

### Usuários e sessão

| Método | Rota | Função |
|---|---|---|
| POST | `/usuarios` | Cadastra o usuário |
| POST | `/usuarios/login` | Gera token de acesso e refresh token |
| POST | `/usuarios/refresh` | Rotaciona a sessão |
| POST | `/usuarios/logout` | Revoga o refresh token |
| POST | `/usuarios/recuperar-senha` | Solicita recuperação pelo e-mail |
| POST | `/usuarios/redefinir-senha` | Redefine a senha com o token recebido |
| GET | `/usuarios/me` | Consulta o perfil autenticado |
| PATCH | `/usuarios/me` | Atualiza perfil ou senha |
| DELETE | `/usuarios/me` | Exclui a conta |

### Clientes e serviços

| Método | Rota | Função |
|---|---|---|
| GET/POST | `/clientes` | Lista ou cadastra clientes |
| GET/PUT/DELETE | `/clientes/:id` | Consulta, atualiza ou exclui um cliente |
| GET | `/clientes/buscar?nome=Maria` | Busca clientes por nome |
| GET | `/clientes?nome=Maria` | Atalho de busca por nome |
| GET | `/clientes/por-servico/:servicoId` | Filtra clientes associados ao serviço |
| GET/POST | `/servicos` | Lista ou cadastra serviços |
| GET/PUT/DELETE | `/servicos/:id` | Consulta, atualiza ou exclui um serviço |
| GET | `/servicos?cliente_id=1` | Filtra serviços por cliente |
| GET | `/servicos/por-cliente/:clienteId` | Forma explícita do filtro por cliente |
| PATCH | `/servicos/:id/status` | Corpo: `{ "status": "Em andamento" }` |
| POST | `/servicos/:id/finalizar` | Conclui o serviço |
| POST | `/servicos/:id/cancelar` | Cancela o serviço |
| GET | `/servicos/alertas-prazos` | Lista vencimentos próximos ou ultrapassados |

### Diagnósticos, orçamentos e pagamentos

| Método | Rota | Função |
|---|---|---|
| GET/POST | `/diagnosticos` | Lista ou registra diagnósticos |
| GET/PUT/DELETE | `/diagnosticos/:id` | Gerencia um diagnóstico |
| GET/POST | `/orcamentos` | Lista ou cria orçamentos |
| GET/PUT/DELETE | `/orcamentos/:id` | Gerencia um orçamento |
| POST | `/orcamentos/:id/enviar` | Gera o link público e muda o status para Enviado |
| GET | `/orcamentos/publico/:id` | Consulta pública do orçamento |
| POST | `/orcamentos/:id/decisao` | Corpo: `{ "decisao": "aprovado" }` ou `{ "decisao": "recusado" }` |
| GET/POST | `/pagamentos` | Lista ou registra pagamentos |
| GET/PUT/DELETE | `/pagamentos/:id` | Gerencia um pagamento |
| GET/POST | `/despesas` | Lista ou registra despesas |
| GET/PUT/DELETE | `/despesas/:id` | Gerencia uma despesa |

### Planos, assinaturas e indicadores

| Método | Rota | Função |
|---|---|---|
| GET/POST | `/planos` | Lista ou cadastra planos |
| GET/PUT/DELETE | `/planos/:id` | Gerencia um plano |
| GET/POST | `/assinaturas` | Lista ou contrata assinatura |
| GET/PUT/DELETE | `/assinaturas/:id` | Gerencia uma assinatura |
| GET | `/relatorios/receitas?inicio=2026-01-01&fim=2026-12-31` | Consulta receitas |
| GET | `/relatorios/despesas?inicio=2026-01-01&fim=2026-12-31` | Consulta despesas |
| GET | `/relatorios/resumo?inicio=2026-01-01&fim=2026-12-31` | Receita, despesa, saldo e pendências |
| GET | `/dashboard` | Resumo geral do negócio |

## Recuperação de senha

Execute `002_password_reset.sql` depois de `db.sql` e `001_refresh_token.sql`.
`POST /usuarios/recuperar-senha` aceita `{ "email": "usuario@exemplo.com" }`.
Em ambiente real, o token retornado deve ser enviado por e-mail. O projeto não envia
e-mails automaticamente. `POST /usuarios/redefinir-senha` aceita
`{ "token": "...", "senha": "novaSenha123" }`.