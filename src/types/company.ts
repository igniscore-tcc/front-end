export interface Company {
  id: number;
  name: string;
  cnpj: string;
  ie?: string;
  ufIe?: string;
  email: string;
  phone: string;
}

export interface CompanyFormData {
  name: string;
  cnpj: string;
  ie?: string;
  ufIe?: string;
  email: string;
  phone: string;
}

export interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CompanyFormData & { id?: number }) => void;
  companyToEdit?: Company | null;
}

export type CompanySortKey = "id" | "name";
