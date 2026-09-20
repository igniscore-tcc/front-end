export type TipoCliente = "PJ" | "PF";

export type Cliente =
  | {
      id: number;
      number: number;
      tipo: "PF";
      nome: string;
      cpf: string;
      email: string;
      telefone: string;
      observacao?: string;
      uf?: string;
      nomeFantasia?: string;
      endereco?: string;
      numero?: string;
      cep?: string;
      bairro?: string;
      cidade?: string;
    }
  | {
      id: number;
      number: number;
      tipo: "PJ";
      nome: string;
      cnpj: string;
      inscricao?: string;
      email: string;
      telefone: string;
      observacao?: string;
      uf?: string;
      nomeFantasia?: string;
      endereco?: string;
      numero?: string;
      cep?: string;
      bairro?: string;
      cidade?: string;
    };

export type ClienteFormData = 
  | {
      tipo: "PF";
      nome: string;
      cpf: string;
      email: string;
      telefone: string;
      observacao?: string;
      uf?: string;
      nomeFantasia?: string;
      endereco?: string;
      numero?: string;
      cep?: string;
      bairro?: string;
      cidade?: string;
    }
  | {
      tipo: "PJ";
      nome: string;
      cnpj: string;
      inscricao?: string;
      email: string;
      telefone: string;
      observacao?: string;
      uf?: string;
      nomeFantasia?: string;
      endereco?: string;
      numero?: string;
      cep?: string;
      bairro?: string;
      cidade?: string;
    };

export interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ClienteFormData & { id?: number }) => Promise<void>;
  clientToEdit?: Cliente | null;
}

export type SortKey = "id" | "nome";