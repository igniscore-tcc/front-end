import { useState } from "react";

export function useExpiration() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const total = 0;
  const totalPages = Math.ceil(total / perPage);
  const hasNextPage = page < totalPages;

  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return {
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