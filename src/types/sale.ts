export enum SaleStatus {
  CONCLUDED = "Concluída",
  PENDING = "Pendente",
  CANCELLED = "Cancelada",
}

export interface Sale {
  id: number;
  total: string;
  desconto: string;
  data: string;
  tipo: string;
  status: SaleStatus;
}
