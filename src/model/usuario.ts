export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

export interface UsuarioComSenha extends Usuario {
  senha: string;
}
