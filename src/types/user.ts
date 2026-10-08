export interface User {
  id: number;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "EMPLOYEE";
}

export interface FuncionarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  funcionarioToEdit?: User | null;
}
