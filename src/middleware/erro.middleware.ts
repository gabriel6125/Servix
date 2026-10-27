import type { ErrorRequestHandler } from 'express';
import { HttpError } from '../util/http-error.js';

export const tratarErro: ErrorRequestHandler = (erro, _req, res, _next) => {
  if (erro instanceof HttpError) {
    res.status(erro.status).json({ erro: erro.message });
    return;
  }

  console.error(erro);
  const status =
    typeof erro === 'object' &&
    erro !== null &&
    'status' in erro &&
    typeof erro.status === 'number' &&
    erro.status >= 400 &&
    erro.status < 500
      ? erro.status
      : 500;
  const mensagem =
    status === 400 ? 'Requisição inválida.' : 'Erro interno do servidor.';

  res.status(status).json({ erro: mensagem });
};
