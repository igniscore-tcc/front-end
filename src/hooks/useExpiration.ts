import { useEffect, useState } from "react";

export interface Expiration {
  expirationId: number;
  saleId: number;
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

  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchExpirations = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const response = await fetch(
          `/api/expirations?page=${page}&size=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data: ExpirationResponse = await response.json();

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

  const hasNextPage = page + 1 < totalPages;

  const from = total === 0 ? 0 : page * perPage + 1;
  const to = Math.min((page + 1) * perPage, total);

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
