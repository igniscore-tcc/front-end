"use client"

import { useState } from "react";
import { 
  Search, 
  Plus, 
  Calendar, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Pencil, 
  Trash2 
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { SaleStatus } from "@/types/sale";
import { mockSales } from "@/mocks/sales";

export default function Sales() {
  const [search, setSearch] = useState("");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="p-8 min-h-screen bg-white text-base">
      <header className="flex items-center gap-6 mb-12">
        <h1 className="text-3xl font-semibold text-[#1a1a1a] shrink-0">
          Vendas
        </h1>

        <div className="relative flex-1 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Procurar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100/80 rounded-full py-2.5 px-6 pl-12 focus:ring-2 focus:ring-[#FF5A1F]/20 focus:bg-white transition-all outline-none text-gray-700 font-medium"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <Button
          className="bg-[#FF5A1F] hover:bg-[#E64D17] text-white rounded-full w-12 h-12 flex items-center justify-center transition-all p-0"
        >
          <Plus size={24} />
        </Button>
      </header>

      <div className="flex flex-wrap items-center gap-4 mb-8">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/20 shadow-sm">
          Data <Calendar size={16} />
        </button>
        
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer bg-gray-100/50 text-gray-500">
          Status <ChevronDown size={16} />
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">Desconto</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {mockSales.map((sale) => (
                <tr
                  key={sale.id}
                  className="group hover:bg-gray-50/80 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-3.5 text-sm text-gray-500">
                    {sale.id}
                  </td>

                  <td className="px-6 py-3.5 text-sm font-bold text-gray-800">
                    {sale.total}
                  </td>

                  <td className="px-6 py-3.5 text-sm text-gray-600">
                    {sale.desconto}
                  </td>

                  <td className="px-6 py-3.5 text-sm text-gray-600">
                    {sale.data}
                  </td>

                  <td className="px-6 py-3.5 text-sm text-gray-600">
                    {sale.tipo}
                  </td>

                  <td className="px-6 py-3.5 text-center">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      sale.status === SaleStatus.CONCLUDED 
                        ? "bg-green-100 text-green-700" 
                        : sale.status === SaleStatus.PENDING
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {sale.status}
                    </span>
                  </td>

                  <td className="px-6 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[#FF5A1F] hover:text-[#E64D17] p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg cursor-pointer">
                        <Pencil size={18} />
                      </button>
                      <button className="text-[#FF5A1F] hover:text-[#E64D17] p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg cursor-pointer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <footer className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-medium text-gray-500">
        <div className="flex items-center gap-2">
          <span>Linhas por página</span>
          <div className="relative">
            <select
              className="bg-transparent font-bold text-gray-800 outline-none appearance-none pr-4 cursor-pointer"
              defaultValue={10}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-bold text-gray-800">
            1-10 de 100
          </span>

          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-400 cursor-pointer">
              <ChevronLeft size={20} />
            </button>

            <button className="p-1.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E64D17] text-white cursor-pointer">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}