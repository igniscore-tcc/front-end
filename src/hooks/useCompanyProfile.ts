import { useEffect, useState } from "react";
import { formatCnpj } from "@/lib/validators";

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  ie: string | null;
  ufIe: string | null;
  email: string;
  phone: string;
}

export function useCompanyProfile() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompany = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/companies/profile");

      if (!response.ok) {
        throw new Error("Erro ao buscar empresa.");
      }

      const data = await response.json();

      setCompany({
        ...data,
        cnpj: formatCnpj(data.cnpj),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return {
    company,
    loading,
    error,
    refetch: fetchCompany,
  };
}
