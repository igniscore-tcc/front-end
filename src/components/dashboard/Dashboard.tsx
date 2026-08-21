"use client";

import { useMemo, useState } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
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

import { Progress } from "@/components/ui/progress";

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
      <div className="mt-8 grid grid-cols-1 gap-8 pb-6 lg:grid-cols-3">
        {/* Gráfico */}
        <Card className="h-[420px] lg:col-span-2">
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

          <CardContent className="h-[80%]">
            {dadosGraficoFiltrados.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                Nenhum dado de venda encontrado para o período.
              </div>
            ) : (
              <div className="flex h-full w-full">
                {/* Eixo Y */}
                <div className="flex w-10 shrink-0 flex-col justify-between pb-7 pt-2 text-right text-[11px] text-muted-foreground">
                  {(() => {
                    const max = Math.max(
                      ...dadosGraficoFiltrados.map((item) => item.vendas),
                      1,
                    );

                    const valorMaximo = Math.ceil(max / 1000) * 1000;

                    return [
                      valorMaximo,
                      valorMaximo * 0.75,
                      valorMaximo * 0.5,
                      valorMaximo * 0.25,
                      0,
                    ].map((valor, index) => (
                      <span key={index}>{formatarMoedaK(valor)}</span>
                    ));
                  })()}
                </div>

                {/* Área do gráfico */}
                <div className="relative min-w-0 flex-1">
                  {/* Linhas horizontais */}
                  <div className="pointer-events-none absolute inset-x-0 top-2 bottom-7 flex flex-col justify-between">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="border-t border-border" />
                    ))}
                  </div>

                  {/* Barras */}
                  <div className="absolute inset-0 flex items-end justify-around gap-3 px-4 pb-7 pt-2">
                    {(() => {
                      const max = Math.max(
                        ...dadosGraficoFiltrados.map((item) => item.vendas),
                        1,
                      );

                      return dadosGraficoFiltrados.map((item) => {
                        const percentual = Math.max(
                          (item.vendas / max) * 100,
                          item.vendas > 0 ? 2 : 0,
                        );

                        return (
                          <div
                            key={item.mes}
                            className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                          >
                            {/* Valor */}
                            <div className="pointer-events-none mb-2 rounded-md border bg-popover px-2 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                              {Number(item.vendas).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                                minimumFractionDigits: 2,
                              })}
                            </div>

                            {/* Barra */}
                            <div
                              className="w-full max-w-[45px] rounded-t-md bg-[var(--chart-1)] transition-all duration-300 hover:opacity-80"
                              style={{
                                height: `${percentual}%`,
                              }}
                              title={`${item.mes}: ${Number(
                                item.vendas,
                              ).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}`}
                            />

                            {/* Label */}
                            <span className="mt-3 whitespace-nowrap text-[11px] font-medium text-muted-foreground">
                              {item.mes}
                            </span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Próximos vencimentos */}
        <Card className="h-[420px]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Próximos Vencimentos</CardTitle>

            <CardDescription>
              Equipamentos que requerem nova vistoria
            </CardDescription>
          </CardHeader>

          <CardContent className="h-[calc(100%-105px)] overflow-y-auto">
            {listaVencimentosFormatada.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center text-center text-sm text-muted-foreground">
                Nenhum equipamento próximo do vencimento mapeado.
              </div>
            ) : (
              <div className="space-y-4">
                {listaVencimentosFormatada.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 border-b pb-3 last:border-none"
                  >
                    <div className="max-w-[65%]">
                      <p className="truncate text-sm font-semibold">
                        {item.item}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {item.local}
                      </p>
                    </div>

                    <div className="whitespace-nowrap text-right">
                      <Badge
                        variant={
                          item.status === "critico"
                            ? "destructive"
                            : item.status === "atencao"
                              ? "secondary"
                              : "outline"
                        }
                        className="mb-1"
                      >
                        {item.dias}
                      </Badge>

                      <p className="text-xs font-medium text-muted-foreground">
                        {item.data}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Indicadores secundários */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {/* Compliance */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-sm">Score de Conformidade</CardTitle>

                <CardDescription className="text-[11px]">
                  Cilindros ativos dentro do prazo
                </CardDescription>
              </div>

              <Badge
                variant={
                  dashboard.compliancePercentage >= 90 ? "default" : "secondary"
                }
              >
                {dashboard.compliancePercentage >= 90 ? "Excelente" : "Regular"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-end justify-between gap-2">
              <span className="text-2xl font-semibold tracking-tight">
                {dashboard.compliancePercentage.toFixed(2)}%
              </span>

              <span className="text-[10px] font-medium text-muted-foreground">
                {dashboard.compliantItems} / {dashboard.totalItems} itens
              </span>
            </div>

            <Progress value={dashboard.compliancePercentage} className="mt-2" />
          </CardContent>
        </Card>

        {/* Previsão */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Previsão de Recargas</CardTitle>

            <CardDescription className="text-[11px]">
              Próximos faturamentos mapeados
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">
              {formatCurrency(dashboard.forecastRecharges)}
            </div>

            <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
              Receita prevista em ordens futuras.
            </p>
          </CardContent>
        </Card>

        {/* Equipamentos */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de Equipamentos</CardTitle>

            <CardDescription className="text-[11px]">
              Itens vendidos
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">
              {dashboard.totalItems}
            </div>

            <p className="mt-1 text-[11px] text-muted-foreground">
              Total de itens vendidos.
            </p>
          </CardContent>
        </Card>

        {/* Inadimplência */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-sm">
                  Inadimplência / Pendente
                </CardTitle>

                <CardDescription className="text-[11px]">
                  Faturamento com atraso
                </CardDescription>
              </div>

              {dashboard.overdueRevenue > 0 && (
                <Badge variant="destructive">Atenção</Badge>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div
              className={`text-2xl font-semibold tracking-tight ${
                dashboard.overdueRevenue > 0 ? "text-destructive" : ""
              }`}
            >
              {formatCurrency(dashboard.overdueRevenue)}
            </div>

            <p className="mt-1 text-[11px] text-muted-foreground">
              {dashboard.overdueClientsCount} clientes inadimplentes.
            </p>
          </CardContent>
        </Card>

        {/* Reprovações */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Reprovações em Testes</CardTitle>

            <CardDescription className="text-[11px]">
              Cilindros condenados no mês
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-end justify-between gap-2">
              <span className="text-2xl font-semibold tracking-tight">
                {dashboard.condemnedItemsThisMonth}
              </span>

              <span className="text-[10px] font-medium text-muted-foreground">
                {dashboard.condemnedItemsThisMonth === 1
                  ? "1 descarte"
                  : `${dashboard.condemnedItemsThisMonth} descartes`}
              </span>
            </div>

            <Progress
              value={
                dashboard.totalItems > 0
                  ? (dashboard.condemnedItemsThisMonth / dashboard.totalItems) *
                    100
                  : 0
              }
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
