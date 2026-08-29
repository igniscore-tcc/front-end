import { useState, useEffect, useCallback, useMemo } from "react";
import { INTERNAL_API, getAuthHeaders } from "@/lib/api";
import { toast } from "sonner";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type UsersResponse = {
  content: User[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

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

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const backendPage = page - 1;

      const response = await fetch(
        `${INTERNAL_API}/users/findall?page=${backendPage}&size=${perPage}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        },
      );

      const result = await safeJson(response);

      if (!response.ok) {
        throw new Error(result.error || "Erro ao buscar usuários");
      }

      const data: UsersResponse = result;

      const formattedUsers: User[] = Array.isArray(data.content)
        ? data.content.map((user: any) => ({
            id: Number(user.id),
            name: user.name || "",
            email: user.email || "",
            role: user.role || "",
          }))
        : [];

      setUsers(formattedUsers);

      setTotal(
        typeof data.totalElements === "number"
          ? data.totalElements
          : formattedUsers.length,
      );

      setTotalPages(typeof data.totalPages === "number" ? data.totalPages : 1);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);

      toast.error(
        isOfflineError(error)
          ? "Servidor indisponível. Tente novamente em instantes."
          : error instanceof Error
            ? error.message
            : "Erro ao carregar usuários",
      );
    } finally {
      setLoading(false);
    }
  }, [page, perPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    });
  }, [users, search]);

  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const nextPage = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  };

  const changePerPage = (value: number) => {
    setPerPage(value);
    setPage(1);
  };

  const refresh = useCallback(async () => {
    await fetchUsers();
  }, [fetchUsers]);

  return {
    users: filteredUsers,

    loading,

    search,
    setSearch,

    page,
    setPage,

    perPage,
    setPerPage: changePerPage,

    total,
    totalPages,

    from,
    to,

    hasNextPage,
    hasPreviousPage,

    nextPage,
    previousPage,

    refresh,
  };
}
