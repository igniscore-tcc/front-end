import { useState, useMemo } from "react";
import type { Cliente } from "@/types/cliente";

type SortKey = "id" | "nome";

import { mockClients } from "@/mocks/clients";


export function useClients() {
  // Estado principal
  const [clients, setClients] = useState<Cliente[]>(mockClients);
  const [editing, setEditing] = useState<Cliente | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Busca, ordenação e filtro
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "id",
    dir: "asc",
  });

  // Paginação
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Derivados
  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return clients.filter(
      (c) =>
        c.nome.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.cnpj.toLowerCase().includes(term),
    );
  }, [search, clients]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];
      if (va < vb) return sort.dir === "asc" ? -1 : 1;
      if (va > vb) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sort]);

  const total = sorted.length;
  const totalPages = Math.ceil(total / perPage);

  const pageData = useMemo(() => {
    const start = (page - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }, [sorted, page, perPage]);

  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  // Ações
  const handleSort = (key: SortKey) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  };

  const addClient = (data: any) => {
    const nextId =
      clients.length > 0 ? Math.max(...clients.map((c) => c.id)) + 1 : 1;
    setClients((prev) => [
      ...prev,
      { ...data, id: nextId, numero: data.telefone },
    ]);
    setShowModal(false);
  };

  const saveEdit = (data: any) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === data.id
          ? { ...c, ...data, numero: data.telefone || data.numero }
          : c,
      ),
    );
    setEditing(null);
  };

  const removeClient = (id: number) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    pageData,
    total,
    totalPages,
    from,
    to,
    search,
    setSearch,
    sort,
    handleSort,
    page,
    setPage,
    perPage,
    setPerPage,
    showModal,
    setShowModal,
    addClient,
    editing,
    setEditing,
    saveEdit,
    removeClient,
  };
}
