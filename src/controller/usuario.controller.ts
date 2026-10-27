import type { RequestHandler } from 'express';
import type {
  CreateUsuarioDto,
  LoginUsuarioDto,
  UpdateUsuarioDto,
} from '../dto/usuario.dto.js';
import {
  atualizarUsuario,
  autenticarUsuario,
  cadastrarUsuario,
  consultarUsuario,
  removerUsuario,
  tempoExpiracaoToken,
} from '../service/usuario.servico.js';

export const criar: RequestHandler = async (req, res) => {
  const dados = req.body as CreateUsuarioDto;
  const usuario = await cadastrarUsuario(dados);
  res.status(201).json(usuario);
};

export const login: RequestHandler = async (req, res) => {
  const dados = req.body as LoginUsuarioDto;
  const resultado = await autenticarUsuario(dados);
  res.status(200).json({
    accessToken: resultado.accessToken,
    tokenType: 'Bearer',
    expiresIn: tempoExpiracaoToken,
    usuario: resultado.usuario,
  });
};

export const consultarPerfil: RequestHandler = async (_req, res) => {
  const usuarioId = res.locals.usuarioId as string;
  const usuario = await consultarUsuario(usuarioId);
  res.status(200).json(usuario);
};

export const atualizarPerfil: RequestHandler = async (req, res) => {
  const usuarioId = res.locals.usuarioId as string;
  const dados = req.body as UpdateUsuarioDto;
  const usuario = await atualizarUsuario(usuarioId, dados);
  res.status(200).json(usuario);
};

export const excluirPerfil: RequestHandler = async (_req, res) => {
  const usuarioId = res.locals.usuarioId as string;
  await removerUsuario(usuarioId);
  res.status(204).end();
};
