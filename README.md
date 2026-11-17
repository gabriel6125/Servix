# Servix API

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
   ```

   Execute o schema uma vez em um banco vazio. Se o schema já foi aplicado, execute somente a migração de refresh tokens.

4. Verifique a tipagem e inicie a API:

   ```sh
   npm run typecheck
   npm run dev
   ```

O servidor inicia somente depois de validar a configuração e conectar ao PostgreSQL. `GET /health` verifica a conexão com o banco.

## Rotas

- `POST /usuarios` e `POST /usuarios/login` são públicas e retornam `token` (acesso) e `refreshToken`.
- `POST /usuarios/refresh` recebe `{ "refreshToken": "..." }` e retorna novos tokens. O refresh token é rotacionado a cada uso e expira após 7 dias sem renovação.
- `POST /usuarios/logout` recebe `{ "refreshToken": "..." }` e revoga essa sessão.
- `GET`, `PATCH` e `DELETE /usuarios/me` exigem `Authorization: Bearer <token>`.
- As rotas de clientes, serviços, assinaturas, despesas, diagnósticos, orçamentos, pagamentos e planos exigem autenticação.