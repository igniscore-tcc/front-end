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
import {
  ArrowDown,
  ArrowUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  CheckCircle2,
  User,
} from "lucide-react";
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
          R$ {Number(payload[0].value).toLocaleString("pt-BR")}
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [periodo, setPeriodo] = useState("3");
  const { dashboard, loading } = useDashboard();

  const dataDinamica = useMemo(() => {
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
    const dadosDinamicos = [];
    const dataAtual = new Date();
    const valoresFicticios = [
      12000, 18000, 14000, 22000, 28000, 25000, 5000, 9000, 17000, 8500, 23000,
      35000,
    ];

    for (let i = 11; i >= 0; i--) {
      const d = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - i, 1);
      const nomeMes = mesesLabels[d.getMonth()];
      const valorIndex = Math.abs(
        (d.getMonth() + d.getFullYear()) % valoresFicticios.length,
      );

      dadosDinamicos.push({
        mes: nomeMes,
        vendas: valoresFicticios[valorIndex],
      });
    }
    return dadosDinamicos;
  }, []);

  const dadosFiltrados = dataDinamica.slice(-Number(periodo));

  const proximosVencimentos = [
    {
      id: 1,
      item: "Extintor ABC 4kg",
      local: "Bloco A - Corredor",
      data: "25/06/2026",
      status: "critico",
      dias: "4 dias",
    },
    {
      id: 2,
      item: "Mangueira de Incêndio T2",
      local: "Almoxarifado",
      data: "09/07/2026",
      status: "atencao",
      dias: "18 dias",
    },
    {
      id: 3,
      item: "Extintor CO2 6kg",
      local: "Sala de TI",
      data: "22/07/2026",
      status: "atencao",
      dias: "31 dias",
    },
    {
      id: 4,
      item: "Splinklers (Inspeção)",
      local: "Galpão Principal",
      data: "15/08/2026",
      status: "normal",
      dias: "55 dias",
    },
  ];

  const atividadesRecentes = [
    {
      id: 1,
      tipo: "sucesso",
      texto: "Recarga concluída: 5 Extintores PQS",
      responsavel: "Carlos M.",
      hora: "Há 10 min",
    },
    {
      id: 2,
      tipo: "manutencao",
      texto: "Nova OS aberta para testes de hidrante",
      responsavel: "Sistema",
      hora: "Há 2 horas",
    },
    {
      id: 3,
      tipo: "sucesso",
      texto: "Visita técnica agendada com Cliente Alfa",
      responsavel: "Mariana S.",
      hora: "Ontem",
    },
  ];

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
    if (valor >= 1000) return `${valor / 1000}k`;
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
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-lg flex items-center gap-0.5">
              <ArrowUp width={12} height={12} /> 30%
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
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-lg flex items-center gap-0.5">
              <ArrowUp width={12} height={12} /> 20%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-gray-700 font-medium text-3xl tracking-tight">
              {dashboard.totalClients}
            </div>
            <p className="mt-2 text-xs text-gray-400">24 novos esta semana</p>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start text-sm font-medium text-gray-500">
            Ordens em Aberto
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-lg">
              Estável
            </span>
          </div>
          <div className="mt-4">
            <div className="text-gray-700 font-medium text-3xl tracking-tight">
              {dashboard.pendingOrders}
            </div>
            <p className="mt-2 text-xs text-gray-400">Nenhuma ordem pendente</p>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start text-sm font-medium text-gray-500">
            Vencerão em Breve
            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-lg flex items-center gap-0.5">
              <ArrowDown width={12} height={12} /> 20%
            </span>
          </div>
          <div className="mt-4">
            <div className="text-gray-700 font-medium text-3xl tracking-tight">
              {dashboard.upcomingExpirations}
            </div>
            <p className="mt-2 text-xs text-amber-600 font-medium flex items-center gap-1">
              <Clock width={12} height={12} /> Próximos 30 dias
            </p>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start text-sm font-medium text-gray-500">
            Itens Vencidos
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-lg flex items-center gap-0.5">
              +2
            </span>
          </div>
          <div className="mt-4">
            <div className="text-red-600 font-medium text-3xl tracking-tight">
              {dashboard.expiredExpirations}
            </div>
            <p className="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
              <AlertTriangle width={12} height={12} /> Ação necessária urgente
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
                Visão retroativa de faturamento de contratos
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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dadosFiltrados}
                margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="#F3F4F6" />
                <XAxis
                  dataKey="mes"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 500 }}
                  padding={{ left: 15, right: 15 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatarMoedaK}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  domain={[0, "dataMax + 5000"]}
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
            {proximosVencimentos.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-none"
              >
                <div>
                  <p className="font-semibold text-sm text-gray-700">
                    {item.item}
                  </p>
                  <p className="text-xs text-gray-400">{item.local}</p>
                </div>
                <div className="text-right">
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
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 grid-rows-1 h-[250px]">
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
              <span className="bg-green-50 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                Excelente
              </span>
            </div>

            <div className="mt-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-2xl font-semibold text-gray-700 tracking-tight">
                  94.2%
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  342 / 363 itens
                </span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all duration-500"
                  style={{ width: "94.2%" }}
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
                  A vencer nos próximos 90 dias
                </p>
              </div>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-0.5">
                <ArrowUp width={10} height={10} /> 12%
              </span>
            </div>

            <div className="mt-2">
              <div className="text-2xl font-semibold text-gray-700 tracking-tight">
                R$ 14.850
              </div>
              <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                Receita prevista em ordens mapeadas.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-medium text-gray-700 tracking-tight">
                  Resolução de OS
                </h2>
                <p className="text-[11px] text-gray-400">
                  Vistorias técnicas concluídas
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse mt-1"></div>
            </div>

            <div className="mt-1 flex gap-4 items-center">
              <div>
                <div className="text-xl font-semibold text-gray-700 tracking-tight">
                  88%
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  Conclusão
                </p>
              </div>
              <div className="border-l border-gray-100 pl-4">
                <div className="text-sm font-semibold text-gray-800">
                  4.2 dias
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  Tempo de rota
                </p>
              </div>
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
              <span className="bg-red-50 text-red-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                Atenção
              </span>
            </div>

            <div className="mt-2">
              <div className="text-2xl font-semibold text-red-600 tracking-tight">
                R$ 3.240
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                7 clientes com faturas pendentes.
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
              <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded">
                Normal
              </span>
            </div>

            <div className="mt-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-2xl font-semibold text-gray-700 tracking-tight">
                  1.8%
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  4 extintores descartados
                </span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-500"
                  style={{ width: "1.8%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
