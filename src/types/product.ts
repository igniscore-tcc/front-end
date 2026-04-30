export enum ProductType {
  EXTINGUISHER = "EXTINGUISHER",
  SERVICE = "SERVICE",
  CONSUMABLE = "CONSUMABLE",
  ACCESSORY = "ACCESSORY",
  HOSE = "HOSE",
  DETECTOR = "DETECTOR",
  SPRINKLER = "SPRINKLER",
  CENTRAL = "CENTRAL",
  LIGHTING = "LIGHTING",
  DOOR = "DOOR",
  HYDRANT = "HYDRANT",
}

export interface Product {
  id: number;
  nome: string;
  tipo: ProductType;
  validade: string;
  lote: string;
  preco: number;
}

export interface ProductFormData {
  nome: string;
  tipo: ProductType;
  validade: string;
  lote: string;
  preco: number;
}

export type ProductSortKey =
  | "id"
  | "nome"
  | "tipo"
  | "validade"
  | "lote"
  | "preco";

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    data: ProductFormData & { id?: number }
  ) => Promise<void>;
  productToEdit?: Product | null;
}