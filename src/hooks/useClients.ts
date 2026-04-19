import { useState, useMemo } from "react";
import type { Cliente, SortKey, ClienteFormData } from "@/types/cliente";
import { mockClients } from "@/mocks/clients";

export function useClients() {
  const [clients, setClients] = useState<Cliente[]>(mockClients);
  const [editing, setEditing] = useState<Cliente | null>(null);
  const [deleting, setDeleting] = useState<Cliente | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "id",
    dir: "asc",
  });
  
  const [filterTipo, setFilterTipo] = useState<"ALL" | "PF" | "PJ">("ALL");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    
    let result = clients;
    if (filterTipo !== "ALL") {
      result = result.filter(c => c.tipo === filterTipo);
    }
    
    return result.filter(
      (c) => {
        const doc = c.tipo === "PF" ? c.cpf : c.cnpj;
        return c.nome.toLowerCase().includes(term) ||
               c.email.toLowerCase().includes(term) ||
               doc.toLowerCase().includes(term);
      }
    );
  }, [search, clients, filterTipo]);

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

  const handleSort = (key: SortKey) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  };

  const addClient = (data: ClienteFormData) => {
    const nextId = clients.length > 0 ? Math.max(...clients.map((c) => c.id)) + 1 : 1;
    setClients((prev) => [
      ...prev,
      { ...data, id: nextId } as Cliente,
    ]);
    setShowModal(false);
  };

  const saveEdit = (data: ClienteFormData & { id?: number }) => {
    if (!data.id) return;
    setClients((prev) =>
      prev.map((c) =>
        c.id === data.id
          ? ({ ...c, ...data } as Cliente)
          : c,
      ),
    );
    setEditing(null);
  };

  const removeClient = (id: number) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    setDeleting(null);
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
    deleting,
    setDeleting,
    filterTipo,
    setFilterTipo,
  };
}
