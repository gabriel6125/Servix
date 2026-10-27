import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';
import { obterSegredoJwt } from '../service/usuario.servico.js';

export const autenticar: RequestHandler = (req, res, next) => {
  const cabecalho = req.get('authorization');
  const correspondencia = cabecalho?.match(/^Bearer\s+(.+)$/i);

  if (!correspondencia?.[1]) {
    res.status(401).json({ erro: 'Token de autenticação não informado.' });
    return;
  }

  const segredo = obterSegredoJwt();
  try {
    const payload = jwt.verify(correspondencia[1], segredo);
    if (typeof payload === 'string' || typeof payload.sub !== 'string') {
      res.status(401).json({ erro: 'Token de autenticação inválido.' });
      return;
    }

    res.locals.usuarioId = payload.sub;
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
};
