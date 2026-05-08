import { useState } from "react";
import { INTERNAL_API, getAuthHeaders } from "@/lib/api";

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

interface UpdateUserCompanyResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  company: {
    id: number;
    name: string;
    email: string;
  };
}

export function useUpdateUserCompany() {
  const [loading, setLoading] = useState(false);

  const updateUserCompany = async (
    cnpj: string,
  ): Promise<UpdateUserCompanyResponse> => {
    try {
      setLoading(true);

      const response = await fetch(`${INTERNAL_API}/auth/invite`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ cnpj }),
      });

      const result = await safeJson(response);

      if (!response.ok) {
        throw new Error(result.error || "Erro ao vincular usuário à empresa.");
      }

      return {
        id: Number(result.id),
        name: result.name,
        email: result.email,
        role: result.role,
        company: {
          id: Number(result.company.id),
          name: result.company.name,
          email: result.company.email,
        },
      };
    } catch (error) {
      if (isOfflineError(error)) {
        throw new Error("Servidor indisponível. Tente novamente em instantes.");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUserCompany,
    loading,
  };
}
