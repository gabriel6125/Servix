import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import jwt from 'jsonwebtoken';
import {
  atualizarUsuario as atualizarUsuarioNoBanco,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  criarUsuario as criarUsuarioNoBanco,
  excluirUsuario,
} from '../dao/usuario.dao.js';
import type { Usuario, UsuarioComSenha } from '../model/usuario.js';
import { HttpError } from '../util/http-error.js';

const TOKEN_EXPIRACAO_SEGUNDOS = 3600;
const TAMANHO_HASH_SENHA = 64;

function derivarSenha(senha: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(senha, salt, TAMANHO_HASH_SENHA, (erro, chave) => {
      if (erro) {
        reject(erro);
        return;
      }

      resolve(chave);
    });
  });
}

async function gerarHashSenha(senha: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const hash = await derivarSenha(senha, salt);
  return `${salt}:${hash.toString('hex')}`;
}

async function verificarSenha(senha: string, hashArmazenado: string): Promise<boolean> {
  const [salt, hashHex] = hashArmazenado.split(':');
  if (!salt || !hashHex || !/^[a-f\d]+$/i.test(hashHex)) {
    return false;
  }

  const hashEsperado = Buffer.from(hashHex, 'hex');
  if (hashEsperado.length !== TAMANHO_HASH_SENHA) {
    return false;
  }

  const hashRecebido = await derivarSenha(senha, salt);
  return timingSafeEqual(hashEsperado, hashRecebido);
}

export function obterSegredoJwt(): string {
  const segredo = process.env.JWT_SECRET;
  if (!segredo || segredo.length < 32) {
    throw new Error('Configure JWT_SECRET com pelo menos 32 caracteres.');
  }

  return segredo;
}

function isViolacaoUnicidade(erro: unknown): boolean {
  return (
    typeof erro === 'object' &&
    erro !== null &&
    'code' in erro &&
    erro.code === '23505'
  );
}

export async function cadastrarUsuario(dados: {
  nome: string;
  email: string;
  senha: string;
}): Promise<Usuario> {
  const senha = await gerarHashSenha(dados.senha);

  try {
    return await criarUsuarioNoBanco({
      nome: dados.nome,
      email: dados.email.toLowerCase(),
      senha,
    });
  } catch (erro) {
    if (isViolacaoUnicidade(erro)) {
      throw new HttpError(409, 'Já existe um usuário com este e-mail.');
    }

    throw erro;
  }
}

export async function autenticarUsuario(dados: {
  email: string;
  senha: string;
}): Promise<{ usuario: Usuario; accessToken: string }> {
  const usuario = await buscarUsuarioPorEmail(dados.email.toLowerCase());
  if (!usuario || !(await verificarSenha(dados.senha, usuario.senha))) {
    throw new HttpError(401, 'E-mail ou senha inválidos.');
  }

  const accessToken = jwt.sign(
    {},
    obterSegredoJwt(),
    { subject: usuario.id, expiresIn: TOKEN_EXPIRACAO_SEGUNDOS },
  );

  return {
    usuario: usuarioSemSenha(usuario),
    accessToken,
  };
}

export async function consultarUsuario(id: string): Promise<Usuario> {
  const usuario = await buscarUsuarioPorId(id);
  if (!usuario) {
    throw new HttpError(404, 'Usuário não encontrado.');
  }

  return usuario;
}

export async function atualizarUsuario(
  id: string,
  dados: { nome?: string; email?: string; senha?: string },
): Promise<Usuario> {
  if (Object.values(dados).every((valor) => valor === undefined)) {
    throw new HttpError(400, 'Informe ao menos um campo para atualizar.');
  }

  const dadosAtualizados = { ...dados };
  if (dadosAtualizados.email !== undefined) {
    dadosAtualizados.email = dadosAtualizados.email.toLowerCase();
  }
  if (dadosAtualizados.senha !== undefined) {
    dadosAtualizados.senha = await gerarHashSenha(dadosAtualizados.senha);
  }

  try {
    const usuario = await atualizarUsuarioNoBanco(id, dadosAtualizados);
    if (!usuario) {
      throw new HttpError(404, 'Usuário não encontrado.');
    }

    return usuario;
  } catch (erro) {
    if (isViolacaoUnicidade(erro)) {
      throw new HttpError(409, 'Já existe um usuário com este e-mail.');
    }

    throw erro;
  }
}

export async function removerUsuario(id: string): Promise<void> {
  const removido = await excluirUsuario(id);
  if (!removido) {
    throw new HttpError(404, 'Usuário não encontrado.');
  }
}

function usuarioSemSenha(usuario: UsuarioComSenha): Usuario {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };
}

export const tempoExpiracaoToken = TOKEN_EXPIRACAO_SEGUNDOS;
