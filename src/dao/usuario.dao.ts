import { connection } from '../util/connection.js';
import type { Usuario, UsuarioComSenha } from '../model/usuario.js';

export async function criarUsuario(
  dados: Omit<UsuarioComSenha, 'id'>,
): Promise<Usuario> {
  const resultado = await connection.query<Usuario>(
    'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
    [dados.nome, dados.email, dados.senha],
  );
  const usuario = resultado.rows[0];

  if (!usuario) {
    throw new Error('O banco de dados não retornou o usuário criado.');
  }

  return usuario;
}

export async function buscarUsuarioPorEmail(
  email: string,
): Promise<UsuarioComSenha | null> {
  const resultado = await connection.query<UsuarioComSenha>(
    'SELECT id, nome, email, senha FROM usuario WHERE email = $1',
    [email],
  );

  return resultado.rows[0] ?? null;
}

export async function buscarUsuarioPorId(id: string): Promise<Usuario | null> {
  const resultado = await connection.query<Usuario>(
    'SELECT id, nome, email FROM usuario WHERE id = $1',
    [id],
  );

  return resultado.rows[0] ?? null;
}

export async function atualizarUsuario(
  id: string,
  dados: { nome?: string; email?: string; senha?: string },
): Promise<Usuario | null> {
  const campos: string[] = [];
  const valores: string[] = [];

  if (dados.nome !== undefined) {
    valores.push(dados.nome);
    campos.push(`nome = $${valores.length}`);
  }

  if (dados.email !== undefined) {
    valores.push(dados.email);
    campos.push(`email = $${valores.length}`);
  }

  if (dados.senha !== undefined) {
    valores.push(dados.senha);
    campos.push(`senha = $${valores.length}`);
  }

  valores.push(id);
  const resultado = await connection.query<Usuario>(
    `UPDATE usuario SET ${campos.join(', ')} WHERE id = $${valores.length} RETURNING id, nome, email`,
    valores,
  );

  return resultado.rows[0] ?? null;
}

export async function excluirUsuario(id: string): Promise<boolean> {
  const resultado = await connection.query(
    'DELETE FROM usuario WHERE id = $1',
    [id],
  );

  return resultado.rowCount === 1;
}
