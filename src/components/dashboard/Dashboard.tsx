"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { CalendarClock, CalendarX2, NotebookText, ShoppingCart, User } from "lucide-react"

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
        <div className="bg-white p-5 rounded-xl min-h-[150px] text-[#6B7280] flex justify-between">
          <div>
            Vendas do mês
            <div className="text-black mt-4 font-semibold text-4xl">400k</div>
          </div>
          <ShoppingCart className="text-[#FF5A1F]" width={32} height={32} />
        </div>

        <div className="bg-white p-5 rounded-xl min-h-[150px] text-[#6B7280] flex justify-between">
          <div>
            Clientes ativos
            <div className="text-black mt-4 font-semibold text-4xl">20k</div>
          </div>
          <User className="text-[#FF5A1F]" width={32} height={32} />
        </div>

        <div className="bg-white p-5 rounded-xl min-h-[150px] text-[#6B7280] flex justify-between">
          <div>
            Ordens em aberto
            <div className="text-black mt-4 font-semibold text-4xl">10</div>
          </div>
          <NotebookText className="text-[#FF5A1F]" width={32} height={32} />
        </div>

        <div className="bg-white p-5 rounded-xl min-h-[150px] text-[#6B7280] flex justify-between">
          <div>
            Vencimentos próximos
            <div className="text-black mt-4 font-semibold text-4xl">2</div>
          </div>
          <CalendarClock className="text-[#FF5A1F]" width={32} height={32} />
        </div>

        <div className="bg-white p-5 rounded-xl min-h-[150px] text-[#6B7280] flex justify-between">
          <div>
            Vencidos
            <div className="text-black mt-4 font-semibold text-4xl">10</div>
          </div>
          <CalendarX2 className="text-[#FF5A1F]" width={32} height={32} />
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
            <AreaChart data={dadosFiltrados} className="outline-none">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="vendas"
                stroke="#FF5A1F"
                fill="#FF5A1F"
              />
            </AreaChart>
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
