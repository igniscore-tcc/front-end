"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import { ArrowDown, ArrowUp, AlertTriangle, Clock } from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  vendas: {
    label: "Vendas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const [periodo, setPeriodo] = useState("3");

  const { dashboard, salesHistory, upcomingExpirations, loading } =
    useDashboard();

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
        data: item.expirationDate,
        status,
        dias: `${item.daysRemaining} ${
          item.daysRemaining === 1 ? "dia" : "dias"
        }`,
      };
    });
  }, [upcomingExpirations]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);

  const formatarMoedaK = (valor: number) => {
    if (valor >= 1000) {
      return `${(valor / 1000).toFixed(0)}k`;
    }

    return valor.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">Carregando clientes...</span>
      </div>
    );
  }

  return (
    <div className="bg-background px-4 py-8 text-foreground md:px-8">
      {/* Header */}
      <div className="mb-6 py-2">
        <h1 className="text-2xl font-medium tracking-tight">Dashboard</h1>

        <p className="mt-0.5 text-sm text-muted-foreground">
          Visão geral do sistema e controle de manutenções
        </p>
      </div>

      {/* KPIs principais */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="flex h-full flex-col justify-between p-5">
            <div className="flex items-start justify-between gap-3 text-sm font-medium text-muted-foreground">
              <span>Faturamento Mensal</span>

              <Badge
                variant={
                  dashboard.revenueGrowthPercentage >= 0
                    ? "default"
                    : "destructive"
                }
                className="flex items-center gap-0.5"
              >
                {dashboard.revenueGrowthPercentage >= 0 ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(dashboard.revenueGrowthPercentage)}%
              </Badge>
            </div>

            <div className="mt-4">
              <div className="text-3xl font-medium tracking-tight">
                {formatCurrency(dashboard.monthlyRevenue)}
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                Em relação ao mês anterior
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex h-full flex-col justify-between p-5">
            <div className="text-sm font-medium text-muted-foreground">
              Clientes Ativos
            </div>

            <div className="mt-4">
              <div className="text-3xl font-medium tracking-tight">
                {dashboard.totalClients}
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                {dashboard.newClientsThisWeek} novos esta semana
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex h-full flex-col justify-between p-5">
            <div className="text-sm font-medium text-muted-foreground">
              Vendas em Aberto
            </div>

            <div className="mt-4">
              <div className="text-3xl font-medium tracking-tight">
                {dashboard.pendingOrders}
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                {dashboard.pendingOrders === 0
                  ? "Nenhuma ordem pendente"
                  : "Ordens aguardando processamento"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex h-full flex-col justify-between p-5">
            <div className="text-sm font-medium text-muted-foreground">
              Vencerão em Breve
            </div>

            <div className="mt-4">
              <div className="text-3xl font-medium tracking-tight">
                {dashboard.itemsExpiringSoon}
              </div>

              <p className="mt-2 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Clock className="h-3 w-3" />
                Próximos 30 dias
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex h-full flex-col justify-between p-5">
            <div className="text-sm font-medium text-muted-foreground">
              Itens Vencidos
            </div>

            <div className="mt-4">
              <div
                className={`text-3xl font-medium tracking-tight ${
                  dashboard.expiredItems > 0 ? "text-destructive" : ""
                }`}
              >
                {dashboard.expiredItems}
              </div>

              <p
                className={`mt-2 flex items-center gap-1 text-xs font-medium ${
                  dashboard.expiredItems > 0
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                <AlertTriangle className="h-3 w-3" />

                {dashboard.expiredItems > 0
                  ? "Ação necessária urgente"
                  : "Nenhum item vencido"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico + Vencimentos */}
      <div className="mt-8 grid grid-cols-1 pb-6 lg:grid-cols-1">
        {/* Gráfico */}
        <Card className="flex h-[500px] flex-col lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg">Desempenho de Vendas</CardTitle>

              <CardDescription>
                Visão faturamento real dos contratos baseado no backend
              </CardDescription>
            </div>

            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-[155px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="3">Últimos 3 meses</SelectItem>
                <SelectItem value="6">Últimos 6 meses</SelectItem>
                <SelectItem value="9">Últimos 9 meses</SelectItem>
                <SelectItem value="12">Últimos 12 meses</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent className="min-h-0 flex-1 pb-6">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart
                data={dadosGraficoFiltrados}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="mes"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatarMoedaK}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />

                <Area
                  type="monotone"
                  dataKey="vendas"
                  stroke="var(--color-vendas)"
                  fill="var(--color-vendas)"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores secundários */}
    </div>
  );
}
