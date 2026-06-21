import { useCallback, useEffect, useState } from "react";
import { INTERNAL_API, getAuthHeaders } from "@/lib/api";
import { toast } from "sonner";

export interface DashboardData {
  totalClients: number;
  newClientsThisWeek: number;
  monthlyRevenue: number;
  revenueGrowthPercentage: number;
  pendingOrders: number;
  itemsExpiringSoon: number;
  expiredItems: number;
  compliantItems: number;
  totalItems: number;
  compliancePercentage: number;
  forecastRecharges: number;
  overdueRevenue: number;
  overdueClientsCount: number;
  condemnedItemsThisMonth: number;
}

export interface SalesHistoryData {
  month: number;
  year: number;
  total: number;
}

export interface UpcomingExpirationData {
  equipmentName: string;
  location: string | null;
  daysRemaining: number;
  expirationDate: string;
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
    newClientsThisWeek: 0,
    monthlyRevenue: 0,
    revenueGrowthPercentage: 0,
    pendingOrders: 0,
    itemsExpiringSoon: 0,
    expiredItems: 0,
    compliantItems: 0,
    totalItems: 0,
    compliancePercentage: 0,
    forecastRecharges: 0,
    overdueRevenue: 0,
    overdueClientsCount: 0,
    condemnedItemsThisMonth: 0,
  });

  const [salesHistory, setSalesHistory] = useState<SalesHistoryData[]>([]);
  const [upcomingExpirations, setUpcomingExpirations] = useState<
    UpcomingExpirationData[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const [dashRes, salesRes, expirationsRes] = await Promise.all([
        fetch(`${INTERNAL_API}/dashboard/dashboard`, {
          method: "GET",
          headers: getAuthHeaders(),
        }),
        fetch(`${INTERNAL_API}/dashboard/sales`, {
          method: "GET",
          headers: getAuthHeaders(),
        }),
        fetch(`${INTERNAL_API}/dashboard/expirations`, {
          method: "GET",
          headers: getAuthHeaders(),
        }),
      ]);

      const dashResult = await safeJson(dashRes);
      const salesResult = await safeJson(salesRes);
      const expirationsResult = await safeJson(expirationsRes);

      if (!dashRes.ok) {
        throw new Error(
          dashResult.error || "Erro ao carregar métricas do dashboard",
        );
      }
      if (!salesRes.ok) {
        throw new Error(
          salesResult.error || "Erro ao carregar histórico de vendas",
        );
      }
      if (!expirationsRes.ok) {
        throw new Error(
          expirationsResult.error ||
            "Erro ao carregar vencimentos de equipamentos",
        );
      }

      setDashboard({
        totalClients: Number(dashResult.totalClients ?? 0),
        newClientsThisWeek: Number(dashResult.newClientsThisWeek ?? 0),
        monthlyRevenue: Number(dashResult.monthlyRevenue ?? 0),
        revenueGrowthPercentage: Number(
          dashResult.revenueGrowthPercentage ?? 0,
        ),
        pendingOrders: Number(dashResult.pendingOrders ?? 0),
        itemsExpiringSoon: Number(dashResult.itemsExpiringSoon ?? 0),
        expiredItems: Number(dashResult.expiredItems ?? 0),
        compliantItems: Number(dashResult.compliantItems ?? 0),
        totalItems: Number(dashResult.totalItems ?? 0),
        compliancePercentage: Number(dashResult.compliancePercentage ?? 0),
        forecastRecharges: Number(dashResult.forecastRecharges ?? 0),
        overdueRevenue: Number(dashResult.overdueRevenue ?? 0),
        overdueClientsCount: Number(dashResult.overdueClientsCount ?? 0),
        condemnedItemsThisMonth: Number(
          dashResult.condemnedItemsThisMonth ?? 0,
        ),
      });

      if (Array.isArray(salesResult)) {
        setSalesHistory(
          salesResult.map((item: any) => ({
            month: Number(item.month ?? 0),
            year: Number(item.year ?? 0),
            total: Number(item.total ?? 0),
          })),
        );
      }

      if (Array.isArray(expirationsResult)) {
        setUpcomingExpirations(
          expirationsResult.map((item: any) => ({
            equipmentName: String(item.equipmentName ?? ""),
            location: item.location ? String(item.location) : null,
            daysRemaining: Number(item.daysRemaining ?? 0),
            expirationDate: String(item.expirationDate ?? ""),
          })),
        );
      }
    } catch (error) {
      console.error("Erro ao carregar dados do painel:", error);

      toast.error(
        isOfflineError(error)
          ? "Servidor indisponível. Tente novamente em instantes."
          : error instanceof Error
            ? error.message
            : "Erro ao carregar dados do dashboard",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    dashboard,
    salesHistory,
    upcomingExpirations,
    loading,
    refreshDashboard: fetchDashboardData,
  };
}
