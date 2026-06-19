import { useCallback, useEffect, useState } from "react";
import { INTERNAL_API, getAuthHeaders } from "@/lib/api";
import { toast } from "sonner";

interface DashboardData {
  totalClients: number;
  totalProducts: number;
  totalSales: number;
  monthlyRevenue: number;
  pendingOrders: number;
  expiringProducts: number;
  currentMonthExpirations: number;
  upcomingExpirations: number;
  expiredExpirations: number;
}

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

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>({
    totalClients: 0,
    totalProducts: 0,
    totalSales: 0,
    monthlyRevenue: 0,
    pendingOrders: 0,
    expiringProducts: 0,
    currentMonthExpirations: 0,
    upcomingExpirations: 0,
    expiredExpirations: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`${INTERNAL_API}/dashboard`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const result = await safeJson(response);

      if (!response.ok) {
        throw new Error(result.error || "Erro ao carregar dashboard");
      }

      setDashboard({
        totalClients: Number(result.totalClients ?? 0),
        totalProducts: Number(result.totalProducts ?? 0),
        totalSales: Number(result.totalSales ?? 0),
        monthlyRevenue: Number(result.monthlyRevenue ?? 0),
        pendingOrders: Number(result.pendingOrders ?? 0),
        expiringProducts: Number(result.expiringProducts ?? 0),
        currentMonthExpirations: Number(result.currentMonthExpirations ?? 0),
        upcomingExpirations: Number(result.upcomingExpirations ?? 0),
        expiredExpirations: Number(result.expiredExpirations ?? 0),
      });
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);

      toast.error(
        isOfflineError(error)
          ? "Servidor indisponível. Tente novamente em instantes."
          : "Erro ao carregar dashboard",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    refreshDashboard: fetchDashboard,
  };
}
