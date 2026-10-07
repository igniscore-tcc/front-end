import { Cliente } from "./cliente";

export enum SaleStatus {
    PAID = "PAID",
    PENDING = "PENDING",
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
    numberSale: number;
    total: string;
    desconto: string;
    data: string;
    rawDate?: string;
    tipo: string;
    tipoDocumento: string;
    documento: string;
    status: SaleStatus;

    cliente?: Cliente;
    items?: SaleItem[];
}
