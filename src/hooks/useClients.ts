import { useState, useMemo, useEffect, useCallback } from "react";
import type { Cliente, SortKey, ClienteFormData } from "@/types/cliente";
//import { mockClients } from "@/mocks/clients";
import { INTERNAL_API, getAuthHeaders } from "@/lib/api";

export function useClients() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Cliente | null>(null);
  const [deleting, setDeleting] = useState<Cliente | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${INTERNAL_API}/clients/findall?page=${page - 1}&size=${perPage}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao buscar clientes");
      }

      const data = Array.isArray(result)
        ? result
        : Array.isArray(result.content)
          ? result.content
          : [];

      const formattedClients: Cliente[] = data.map((client: any) => ({
        id: Number(client.id),
        number: client.number,
        nome: client.name,
        tipo: client.cpf ? "PF" : "PJ",
        email: client.email,
        telefone: client.phone || "",
        cpf: client.cpf || "",
        cnpj: client.cnpj || "",
        inscricao: client.ie || "",
        uf: client.ufIe || "SP",
        observacao: client.obs || "",
      }));

      setClients(formattedClients);

      setTotal(
        typeof result.totalElements === "number"
          ? result.totalElements
          : formattedClients.length,
      );
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setLoading(false);
    }
  }, [page, perPage]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "id",
    dir: "asc",
  });

  const [filterTipo, setFilterTipo] = useState<"ALL" | "PF" | "PJ">("ALL");

  const filtered = useMemo(() => {
    const term = search.toLowerCase();

    let result = clients;

    if (filterTipo !== "ALL") {
      result = result.filter((c) => c.tipo === filterTipo);
    }

    return result.filter((c) => {
      const doc = c.tipo === "PF" ? c.cpf : c.cnpj;

      return (
        (c.nome || "").toLowerCase().includes(term) ||
        (c.email || "").toLowerCase().includes(term) ||
        (doc || "").toLowerCase().includes(term)
      );
    });
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

  const hasNextPage = clients.length === perPage;
  const totalPages = hasNextPage ? page + 1 : page;

  const pageData = sorted;

  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  const handleSort = (key: SortKey) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  };

  const addClient = async (data: ClienteFormData) => {
    try {
      const payload = {
        name: data.nome,
        cnpj: data.tipo === "PJ" ? data.cnpj : null,
        cpf: data.tipo === "PF" ? data.cpf : null,
        email: data.email,
        phone: data.telefone,
        ie: data.tipo === "PJ" ? data.inscricao : "",
        ufIe: data.uf ?? "SP",
        obs: data.observacao || null,
      };

      const response = await fetch(`${INTERNAL_API}/clients/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao cadastrar cliente");
      }

      console.log("RAW DATA:", data);

      const newClient: Cliente = {
        id: Number(result.id),
        number: result.number,
        nome: result.name,
        tipo: result.cpf ? "PF" : "PJ",
        email: result.email,
        telefone: result.phone,
        cpf: result.cpf || "",
        cnpj: result.cnpj || "",
        inscricao: result.ie || "",
        uf: result.ufIe || "SP",
        observacao: result.obs || "",
      };

      setClients((prev) => [...prev, newClient]);
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      throw error;
    }
  };

  const saveEdit = async (data: ClienteFormData & { id?: number }) => {
    if (!data.id) return;

    try {
      const payload = {
        id: data.id,
        name: data.nome,
        cnpj: data.tipo === "PJ" ? data.cnpj : null,
        cpf: data.tipo === "PF" ? data.cpf : null,
        email: data.email,
        phone: data.telefone,
        ie: data.tipo === "PJ" ? data.inscricao : "",
        ufIe: data.uf ?? "SP",
        obs: data.observacao || null,
      };

      const response = await fetch(`${INTERNAL_API}/clients/update`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao atualizar cliente");
      }

      const updatedClient: Cliente = {
        id: Number(result.id),
        number: result.number,
        nome: result.name,
        tipo: result.cpf ? "PF" : "PJ",
        email: result.email,
        telefone: result.phone,
        cpf: result.cpf || "",
        cnpj: result.cnpj || "",
        inscricao: result.ie || "",
        uf: result.ufIe || "SP",
        observacao: result.obs || "",
      };

      setClients((prev) =>
        prev.map((c) => (c.id === updatedClient.id ? updatedClient : c)),
      );

      setEditing(null);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      throw error;
    }
  };

  const removeClient = (id: number) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    setDeleting(null);
  };

  return {
    pageData,
    loading,
    total,
    totalPages,
    hasNextPage,
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
