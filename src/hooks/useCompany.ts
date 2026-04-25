import { useState } from "react";
import type { Company, CompanyFormData } from "@/types/company";
import { INTERNAL_API, getAuthHeaders } from "@/lib/api";

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

      const result = await response.json();

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
    } finally {
      setLoading(false);
    }
  };

  return {
    createCompany,
    loading,
  };
}
