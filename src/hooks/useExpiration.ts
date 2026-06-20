import { useEffect, useState } from "react";

export interface Expiration {
  expirationId: number;
  saleId: number;
  expirationNumber: number;
  clientName: string;
  saleDate: string;
  dueDate: string;
  totalSale: number;
  status: string;
}

interface ExpirationResponse {
  items: Expiration[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export function useExpiration() {
  const [expirations, setExpirations] = useState<Expiration[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchExpirations = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        // ALTERAÇÃO AQUI: Subtraindo 1 para enviar o índice correto (0, 1, 2...)
        const response = await fetch(
          `/api/expirations?page=${page - 1}&size=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data: ExpirationResponse = await response.json();

        console.log("PAGE:", page);
        console.log("DATA:", data);

        setExpirations(data.items ?? []);
        setTotal(data.totalItems ?? 0);
        setTotalPages(data.totalPages ?? 0);
      } catch (error) {
        console.error("Erro ao carregar vencimentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpirations();
  }, [page, perPage]);

  const hasNextPage = page < totalPages;

  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return {
    expirations,
    loading,
    page,
    setPage,
    perPage,
    setPerPage,
    total,
    totalPages,
    hasNextPage,
    from,
    to,
  };
}
