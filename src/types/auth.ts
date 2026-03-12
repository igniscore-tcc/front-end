export interface RegisterFormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export interface LoginFormData {
  email: string;
  senha: string;
}

export interface CompanyFormData {
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
}
