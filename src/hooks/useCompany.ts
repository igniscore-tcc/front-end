import { useState } from "react";
import type { Company, CompanyFormData } from "@/types/company";
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

export function useCreateCompany() {
  const [loading, setLoading] = useState(false);

  const createCompany = async (data: CompanyFormData): Promise<Company> => {
    try {
      setLoading(true);

      const response = await fetch(`${INTERNAL_API}/auth/company`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result = await safeJson(response);

      if (!response.ok) {
        throw new Error(result.error || "Erro ao cadastrar empresa.");
      }

      return {
        id: Number(result.id),
        name: result.name,
        cnpj: result.cnpj,
        ie: result.ie || "",
        ufIe: result.ufIe || "",
        email: result.email,
        phone: result.phone,
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
    createCompany,
    loading,
  };
}
