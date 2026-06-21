"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { ArrowDown, ArrowUp, AlertTriangle, Clock } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-3 outline-none">
        <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
        <p className="text-[#FF5A1F] font-medium text-base">
          R${" "}
          {Number(payload[0].value).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [periodo, setPeriodo] = useState("3");
  const { dashboard, salesHistory, upcomingExpirations, loading } =
    useDashboard();

  // Mapeia o histórico real de vendas vindo do hook para o formato do gráfico
  const dadosGraficoFiltrados = useMemo(() => {
    const mesesLabels = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    const dadosOrdenados = [...salesHistory].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });

    const formatados = dadosOrdenados.map((item) => ({
      mes: `${mesesLabels[item.month - 1]} / ${String(item.year).slice(-2)}`,
      vendas: item.total,
    }));

    return formatados.slice(-Number(periodo));
  }, [salesHistory, periodo]);

  // Mapeia e define dinamicamente os badges de criticidade do equipamento baseado nos dias restantes
  const listaVencimentosFormatada = useMemo(() => {
    return upcomingExpirations.map((item, index) => {
      let status = "normal";
      if (item.daysRemaining <= 7) {
        status = "critico";
      } else if (item.daysRemaining <= 30) {
        status = "atencao";
      }

      return {
        id: index,
        item: item.equipmentName,
        local: item.location || "Local não informado",
        data: item.expirationDate, // Adapte formatação de data se necessário
        status,
        dias: `${item.daysRemaining} ${item.daysRemaining === 1 ? "dia" : "dias"}`,
      };
    });
  }, [upcomingExpirations]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-[#FF5A1F] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-500 font-medium text-sm">
            Carregando painel de controle...
          </span>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);

  const formatarMoedaK = (valor: number) => {
    if (valor >= 1000) return `${(valor / 1000).toFixed(0)}k`;
    return valor.toString();
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-8 py-8 text-gray-800">
      <div className="py-2 mb-6">
        <h1 className="text-2xl font-medium text-gray-700 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Visão geral do sistema e controle de manutenções
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start text-sm font-medium text-gray-500">
            Faturamento Mensal
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-lg flex items-center gap-0.5 ${
                dashboard.revenueGrowthPercentage >= 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {dashboard.revenueGrowthPercentage >= 0 ? (
                <ArrowUp width={12} height={12} />
              ) : (
                <ArrowDown width={12} height={12} />
              )}
              {Math.abs(dashboard.revenueGrowthPercentage)}%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-gray-700 font-medium text-3xl tracking-tight">
              {formatCurrency(dashboard.monthlyRevenue)}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Em relação ao mês anterior
            </p>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start text-sm font-medium text-gray-500">
            Clientes Ativos
          </div>
          <div className="mt-4">
            <div className="text-gray-700 font-medium text-3xl tracking-tight">
              {dashboard.totalClients}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              {dashboard.newClientsThisWeek} novos esta semana
            </p>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start text-sm font-medium text-gray-500">
            Vendas em Aberto
          </div>
          <div className="mt-4">
            <div className="text-gray-700 font-medium text-3xl tracking-tight">
              {dashboard.pendingOrders}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              {dashboard.pendingOrders === 0
                ? "Nenhuma ordem pendente"
                : "Ordens aguardando processamento"}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start text-sm font-medium text-gray-500">
            Vencerão em Breve
          </div>
          <div className="mt-4">
            <div className="text-gray-700 font-medium text-3xl tracking-tight">
              {dashboard.itemsExpiringSoon}
            </div>
            <p className="mt-2 text-xs text-amber-600 font-medium flex items-center gap-1">
              <Clock width={12} height={12} /> Próximos 30 dias
            </p>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start text-sm font-medium text-gray-500">
            Itens Vencidos
          </div>
          <div className="mt-4">
            <div
              className={`${dashboard.expiredItems > 0 ? "text-red-600" : "text-gray-700"} font-medium text-3xl tracking-tight`}
            >
              {dashboard.expiredItems}
            </div>
            <p
              className={`mt-2 text-xs font-medium flex items-center gap-1 ${dashboard.expiredItems > 0 ? "text-red-500" : "text-gray-400"}`}
            >
              <AlertTriangle width={12} height={12} />
              {dashboard.expiredItems > 0
                ? "Ação necessária urgente"
                : "Nenhum item vencido"}
            </p>
          </div>
        </div>
      </div>

      <div className="pb-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 h-[420px] select-none shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-700 tracking-tight">
                Desempenho de Vendas
              </h2>
              <p className="text-xs text-gray-400">
                Visão faturamento real dos contratos baseado no backend
              </p>
            </div>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <option value="3">Últimos 3 meses</option>
              <option value="6">Últimos 6 meses</option>
              <option value="9">Últimos 9 meses</option>
              <option value="12">Últimos 12 meses</option>
            </select>
          </div>

          <div className="w-full h-[80%]">
            {dadosGraficoFiltrados.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                Nenhum dado de venda encontrado para o período.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dadosGraficoFiltrados}
                  margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="#F3F4F6" />
                  <XAxis
                    dataKey="mes"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 11, fontWeight: 500 }}
                    padding={{ left: 15, right: 15 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatarMoedaK}
                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    domain={[0, "dataMax + 2000"]}
                  />
                  <Tooltip
                    cursor={{ fill: "#F9FAFB" }}
                    content={<CustomTooltip />}
                  />
                  <Bar
                    dataKey="vendas"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={45}
                    fill="#FF5A1F"
                    animationDuration={400}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 h-[420px] shadow-sm border border-gray-100 flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700 tracking-tight">
              Próximos Vencimentos
            </h2>
            <p className="text-xs text-gray-400">
              Equipamentos que requerem nova vistoria
            </p>
          </div>

          <div className="space-y-4 overflow-y-auto flex-1 pr-1 scrollbar-thin">
            {listaVencimentosFormatada.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 text-center">
                Nenhum equipamento próximo do vencimento mapeado.
              </div>
            ) : (
              listaVencimentosFormatada.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-none"
                >
                  <div className="max-w-[65%]">
                    <p className="font-semibold text-sm text-gray-700 truncate">
                      {item.item}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {item.local}
                    </p>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <span
                      className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-md mb-1 ${
                        item.status === "critico"
                          ? "bg-red-50 text-red-700"
                          : item.status === "atencao"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.dias}
                    </span>
                    <p className="text-xs text-gray-400 font-medium">
                      {item.data}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 grid-rows-1 h-auto sm:h-[180px]">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-medium text-gray-700 tracking-tight">
                  Score de Conformidade
                </h2>
                <p className="text-[11px] text-gray-400">
                  Cilindros ativos dentro do prazo
                </p>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  dashboard.compliancePercentage >= 90
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {dashboard.compliancePercentage >= 90 ? "Excelente" : "Regular"}
              </span>
            </div>

            <div className="mt-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-2xl font-semibold text-gray-700 tracking-tight">
                  {dashboard.compliancePercentage.toFixed(2)}%
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {dashboard.compliantItems} / {dashboard.totalItems} itens
                </span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${dashboard.compliancePercentage.toFixed(2)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-medium text-gray-700 tracking-tight">
                  Previsão de Recargas
                </h2>
                <p className="text-[11px] text-gray-400">
                  Próximos faturamentos mapeados
                </p>
              </div>
            </div>

            <div className="mt-2">
              <div className="text-2xl font-semibold text-gray-700 tracking-tight">
                {formatCurrency(dashboard.forecastRecharges)}
              </div>
              <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                Receita prevista em ordens futuras.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-medium text-gray-700 tracking-tight">
                  Total de Equipamentos
                </h2>
                <p className="text-[11px] text-gray-400">Items vendidos</p>
              </div>
            </div>

            <div className="mt-2">
              <div className="text-2xl font-semibold text-gray-700 tracking-tight">
                {dashboard.totalItems}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Total de items vendidos.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-medium text-gray-700 tracking-tight">
                  Inadimplência / Pendente
                </h2>
                <p className="text-[11px] text-gray-400">
                  Faturamento com atraso
                </p>
              </div>
              {dashboard.overdueRevenue > 0 && (
                <span className="bg-red-50 text-red-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                  Atenção
                </span>
              )}
            </div>

            <div className="mt-2">
              <div
                className={`text-2xl font-semibold tracking-tight ${dashboard.overdueRevenue > 0 ? "text-red-600" : "text-gray-700"}`}
              >
                {formatCurrency(dashboard.overdueRevenue)}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                {dashboard.overdueClientsCount} clientes inadimplentes.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-medium text-gray-700 tracking-tight">
                  Reprovações em Testes
                </h2>
                <p className="text-[11px] text-gray-400">
                  Cilindros condenados no mês
                </p>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-2xl font-semibold text-gray-700 tracking-tight">
                  {dashboard.condemnedItemsThisMonth}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {dashboard.condemnedItemsThisMonth === 1
                    ? "1 descarte"
                    : `${dashboard.condemnedItemsThisMonth} descartes`}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width:
                      dashboard.totalItems > 0
                        ? `${(dashboard.condemnedItemsThisMonth / dashboard.totalItems) * 100}%`
                        : "0%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
