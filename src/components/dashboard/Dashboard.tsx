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
import { useState } from "react";
import {
  CalendarClock,
  CalendarX2,
  NotebookText,
  ShoppingCart,
  User,
} from "lucide-react";

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

export default function Dashboard() {
  const [periodo, setPeriodo] = useState("3");

  const dadosFiltrados = data.slice(-Number(periodo));

  return (
    <div className="bg-[#F6F6F6] min-h-screen">
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        <p className="text-sm text-gray-500 mt-1">Visão geral do sistema</p>
      </div>

      <div className="p-6 grid grid-cols-5 gap-8">
        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-2xl min-h-[150px] text-[#6B7280] flex justify-between items-center">
          <div>
            Vendas do mês
            <div className="text-black mt-4 font-semibold text-4xl">400k</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
            <ShoppingCart className="text-[#FF5A1F]" width={28} height={28} />
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-2xl min-h-[150px] text-[#6B7280] flex justify-between items-center">
          <div>
            Clientes ativos
            <div className="text-black mt-4 font-semibold text-4xl">20k</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
            <User className="text-blue-600" width={28} height={28} />
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-2xl min-h-[150px] text-[#6B7280] flex justify-between items-center">
          <div>
            Ordens em aberto
            <div className="text-black mt-4 font-semibold text-4xl">10</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
            <NotebookText className="text-purple-600" width={28} height={28} />
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-2xl min-h-[150px] text-[#6B7280] flex justify-between items-center">
          <div>
            Vencimentos próximos
            <div className="text-black mt-4 font-semibold text-4xl">2</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
            <CalendarClock className="text-yellow-600" width={28} height={28} />
          </div>
        </div>

        <div className="bg-white p-5 border border-gray-100 shadow-sm rounded-2xl min-h-[150px] text-[#6B7280] flex justify-between items-center">
          <div>
            Vencidos
            <div className="text-black mt-4 font-semibold text-4xl">10</div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
            <CalendarX2 className="text-red-600" width={28} height={28} />
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

              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                labelStyle={{
                  color: "#111827",
                  fontWeight: 600,
                }}
                itemStyle={{
                  color: "#FF5A1F",
                }}
                formatter={(value) => [
                  `R$ ${Number(value).toLocaleString("pt-BR")}`,
                  "Vendas",
                ]}
              />

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
