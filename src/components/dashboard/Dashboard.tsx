"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowUp,
  CalendarClock,
  CalendarX2,
  NotebookText,
  ShoppingCart,
  User,
} from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

const data = [
  { mes: "Jan", vendas: 12000 },
  { mes: "Fev", vendas: 18000 },
  { mes: "Mar", vendas: 14000 },
  { mes: "Abr", vendas: 22000 },
  { mes: "Mai", vendas: 28000 },
  { mes: "Jun", vendas: 25000 },
  { mes: "Jul", vendas: 5000 },
  { mes: "Ago", vendas: 9000 },
  { mes: "Set", vendas: 17000 },
  { mes: "Out", vendas: 8500 },
  { mes: "Nov", vendas: 23000 },
  { mes: "Dec", vendas: 35000 },
];

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
        <p className="text-[#FF5A1F] font-bold text-base">
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

  const dadosFiltrados = data.slice(-Number(periodo));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">Carregando dashboard...</span>
      </div>
    );
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        <p className="text-sm text-gray-500 mt-1">Visão geral do sistema</p>
      </div>

      <div className="p-6 grid grid-cols-5 gap-8">
        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-2xl text-[#6B7280]">
          <div>
            <div className="flex justify-between">
              Vendas do mês
              <div className="bg-green-400/20 text-green-800 text-[13px] font-semibold px-2 py-1 rounded-2xl">
                +30%
              </div>
            </div>
            <div className="flex gap-2 items-center mt-4 ">
              <div className="text-black font-semibold text-4xl">
                {formatCurrency(dashboard.monthlyRevenue)}
              </div>
              <div className="bg-green-400/20 text-green-800 w-5 h-5 flex items-center justify-center rounded-2xl">
                <ArrowUp width={13} height={13} />
              </div>
            </div>
            <p className="mt-4 text-[13px]">Aumentou 30% esse mês</p>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-2xl text-[#6B7280]">
          <div>
            <div className="flex justify-between">
              Clientes ativos
              <div className="bg-green-400/20 text-green-800 text-[13px] font-semibold px-2 py-1 rounded-2xl">
                +20%
              </div>
            </div>

            <div className="flex gap-2 items-center mt-4">
              <div className="text-black font-semibold text-4xl">
                {dashboard.totalClients}
              </div>

              <div className="bg-green-400/20 text-green-800 w-5 h-5 flex items-center justify-center rounded-2xl">
                <ArrowUp width={13} height={13} />
              </div>
            </div>

            <p className="mt-4 text-[13px]">Aumento de 20% na ultima semana</p>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-2xl text-[#6B7280]">
          <div>
            <div className="flex justify-between">
              Ordens em aberto
              <div className="bg-gray-400/20 text-gray-800 text-[13px] font-semibold px-2 py-1 rounded-2xl">
                +0
              </div>
            </div>

            <div className="flex gap-2 items-center mt-4">
              <div className="text-black font-semibold text-4xl">
                {dashboard.pendingOrders}
              </div>

              {/*
                <div className="bg-gray-400/20 text-gray-800 w-5 h-5 flex items-center justify-center rounded-2xl">
                <NotebookText width={13} height={13} />
              </div>
              */}
            </div>

            <p className="mt-4 text-[13px]">
              Nenhuma orden de servicos recentemente
            </p>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-2xl text-[#6B7280]">
          <div>
            <div className="flex justify-between">
              Vencimentos próximos
              <div className="bg-green-400/20 text-green-800 text-[13px] font-semibold px-2 py-1 rounded-2xl">
                -20%
              </div>
            </div>

            <div className="flex gap-2 items-center mt-4">
              <div className="text-black font-semibold text-4xl">
                {dashboard.upcomingExpirations}
              </div>

              <div className="bg-green-400/20 text-green-800 w-5 h-5 flex items-center justify-center rounded-2xl">
                <ArrowDown width={13} height={13} />
              </div>
            </div>

            <p className="mt-4 text-[13px]">
              Redução de itens com vencimento próximo
            </p>
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-2xl text-[#6B7280]">
          <div>
            <div className="flex justify-between">
              Vencidos
              <div className="bg-red-400/20 text-red-800 text-[13px] font-semibold px-2 py-1 rounded-2xl">
                +2
              </div>
            </div>

            <div className="flex gap-2 items-center mt-4">
              <div className="text-black font-semibold text-4xl">
                {dashboard.expiredExpirations}
              </div>

              <div className="bg-red-400/20 text-red-800 w-5 h-5 flex items-center justify-center rounded-2xl">
                <ArrowUp width={13} height={13} />
              </div>
            </div>

            <p className="mt-4 text-[13px]">
              Aumento de itens já expirados no sistema
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 mt-8 grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-white rounded-xl p-5 h-[400px] select-none">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Vendas dos últimos meses
            </h2>

            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="3">Últimos 3 meses</option>
              <option value="6">Últimos 6 meses</option>
              <option value="9">Últimos 9 meses</option>
              <option value="12">Últimos 12 meses</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={dadosFiltrados}>
              <CartesianGrid vertical={false} stroke="#F3F4F6" />

              <XAxis dataKey="mes" tickLine={false} axisLine={false} />

              <YAxis tickLine={false} axisLine={false} />

              <Tooltip cursor={false} content={<CustomTooltip />} />

              <Bar
                dataKey="vendas"
                radius={[12, 12, 0, 0]}
                maxBarSize={55}
                fill="#FF5A1F"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 h-[400px]">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Próximos vencimentos
          </h2>

          <div className="space-y-4">
            <div className="border-b pb-3">
              <p className="font-medium text-gray-900">Extintor ABC</p>
              <p className="text-sm text-gray-500">07/06/2026</p>
            </div>

            <div className="border-b pb-3">
              <p className="font-medium text-gray-900">Mangueira</p>
              <p className="text-sm text-gray-500">09/06/2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
