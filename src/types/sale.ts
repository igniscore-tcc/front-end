import { Cliente } from "./cliente";

export enum SaleStatus {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
}

export interface SaleItem {
  id: number;
  nome: string;
  units: number;
  price: number;
  total: string;
}

export interface Sale {
  id: number;
  total: string;
  desconto: string;
  data: string;
  rawDate?: string;
  tipo: string;
  status: SaleStatus;

  cliente?: Cliente;
  items?: SaleItem[];
}
