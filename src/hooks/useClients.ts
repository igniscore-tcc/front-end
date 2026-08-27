import { useState, useMemo, useEffect, useCallback } from "react";
import type { Cliente, SortKey, ClienteFormData } from "@/types/cliente";
import { INTERNAL_API, getAuthHeaders } from "@/lib/api";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";

async function safeJson(response: Response): Promise<any> {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function isOfflineError(error: unknown): boolean {
  return (
    error instanceof TypeError &&
    /fetch|network|failed/i.test(error.message || "")
  );
}

export function useClients() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Cliente | null>(null);
  const [deleting, setDeleting] = useState<Cliente | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);

      let all: any[] = [];
      let currentPage = 0;
      let totalPages = 1;
      const BATCH_SIZE = 100;

      do {
        const response = await fetch(
          `${INTERNAL_API}/clients/findall?page=${currentPage}&size=${BATCH_SIZE}`,
          {
            method: "GET",
            headers: getAuthHeaders(),
          },
        );

        const result = await safeJson(response);

        if (!response.ok) {
          throw new Error(result.error || "Erro ao buscar clientes");
        }

        const data = Array.isArray(result.clients) ? result.clients : [];
        all = all.concat(data);
        totalPages = typeof result.totalPages === "number" ? result.totalPages : 1;
        currentPage++;
      } while (currentPage < totalPages);

      const formattedClients: Cliente[] = all.map((client: any) => ({
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
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      toast.error(
        isOfflineError(error)
          ? "Servidor indisponível. Tente novamente em instantes."
          : "Erro ao carregar clientes",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "nome",
    dir: "asc",
  });

  const [filterTipo, setFilterTipo] = useState<"ALL" | "PF" | "PJ">("ALL");

  const debouncedSearch = useDebounce(search, 300);

  // Filtro roda sobre a base inteira (`clients`), não sobre uma página
  const filtered = useMemo(() => {
    const term = debouncedSearch.toLowerCase();

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
  }, [debouncedSearch, clients, filterTipo]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];
      if (va < vb) return sort.dir === "asc" ? -1 : 1;
      if (va > vb) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sort]);

  // Paginação agora é sobre o resultado já filtrado/ordenado
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const hasNextPage = page < totalPages;

  const pageData = useMemo(
    () => sorted.slice((page - 1) * perPage, page * perPage),
    [sorted, page, perPage],
  );

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

      const result = await safeJson(response);

      if (!response.ok) {
        throw new Error(result.error || "Erro ao cadastrar cliente");
      }

      await fetchClients();
      setShowModal(false);
      toast.success("Cliente cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      toast.error(
        isOfflineError(error)
          ? "Servidor indisponível. Tente novamente em instantes."
          : error instanceof Error
            ? error.message
            : "Erro ao cadastrar cliente",
      );
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

      const result = await safeJson(response);

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
      toast.success("Cliente atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      toast.error(
        isOfflineError(error)
          ? "Servidor indisponível. Tente novamente em instantes."
          : error instanceof Error
            ? error.message
            : "Erro ao atualizar cliente",
      );
      throw error;
    }
  };

  const getClientById = useCallback(async (id: number): Promise<Cliente> => {
    const response = await fetch(`${INTERNAL_API}/clients/findone/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const result = await safeJson(response);

    if (!response.ok) {
      throw new Error(result.error || "Erro ao buscar cliente");
    }

    return result.cpf
      ? {
          id: Number(result.id),
          number: result.number,
          tipo: "PF",
          nome: result.name,
          cpf: result.cpf,
          email: result.email,
          telefone: result.phone || "",
          observacao: result.obs || "",
          uf: result.ufIe || "SP",
        }
      : {
          id: Number(result.id),
          number: result.number,
          tipo: "PJ",
          nome: result.name,
          cnpj: result.cnpj,
          inscricao: result.ie || "",
          email: result.email,
          telefone: result.phone || "",
          observacao: result.obs || "",
          uf: result.ufIe || "SP",
        };
  }, []);

  const removeClient = async (id: number) => {
    try {
      const response = await fetch(`${INTERNAL_API}/clients/delete/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const result = await safeJson(response);
        throw new Error(result.error || "Erro ao excluir cliente");
      }

      await fetchClients();
      setDeleting(null);
      toast.success("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      toast.error(
        isOfflineError(error)
          ? "Servidor indisponível. Tente novamente em instantes."
          : error instanceof Error
            ? error.message
            : "Erro ao excluir cliente",
      );
    }
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
    getClientById,
  };
}