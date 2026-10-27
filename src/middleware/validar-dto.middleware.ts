import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { RequestHandler } from 'express';

export function validarDto<T extends object>(Dto: new () => T): RequestHandler {
  return async (req, res, next) => {
    const instancia = plainToInstance(Dto, req.body);
    const erros = await validate(instancia, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (erros.length > 0) {
      const mensagens = erros.flatMap((erro) =>
        Object.values(erro.constraints ?? {}),
      );
      res.status(400).json({ erro: mensagens });
      return;
    }

    req.body = instancia;
    next();
  };
}
