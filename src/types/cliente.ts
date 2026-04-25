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
    };

export interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ClienteFormData & { id?: number }) => void;
  clientToEdit?: Cliente | null;
}

export type SortKey = "id" | "nome";