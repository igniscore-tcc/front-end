export interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  inscricao: string;
  email: string;
  numero: string;
  observacao?: string;
  uf?: string;
  type?: "PJ" | "PF";
}

export type TipoCliente = "PJ" | "PF";

export interface ClienteFormData {
  nome: string;
  cnpj: string;
  cpf: string;
  inscricao: string;
  uf: string;
  email: string;
  telefone: string;
  observacao: string;
}

export interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  clientToEdit?: Cliente | null;
}

export type SortKey = "id" | "nome";