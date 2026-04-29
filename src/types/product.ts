export interface Product {
    id: number;
    nome: string;
    tipo: string;
    validade: string;
    lote: string;
    preco: number;
}

export interface ProductFormData {
    nome: string;
    tipo: string;
    validade: string;
    lote: string;
    preco: number;
}

export type ProductSortKey = "id" | "nome" | "tipo" | "validade" | "lote" | "preco";

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData & { id?: number }) => void;
  productToEdit?: Product | null;
}