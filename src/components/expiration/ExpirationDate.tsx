"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { ListPageHeader } from "@/components/shared/ListPageHeader";
import { useExpiration } from "@/hooks/useExpiration";

export default function MaturityDate() {
  const {
    expirations,
    loading,
    total,
    page,
    setPage,
    perPage,
    setPerPage,
    from,
    to,
    hasNextPage,
  } = useExpiration();

  const [search, setSearch] = useState("");

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "EXPIRED":
        return "Vencido";
      case "NEXT":
        return "Próximo";
      case "NORMAL":
        return "Normal";
      default:
        return status;
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "EXPIRED":
        return "bg-red-100 text-red-700";
      case "NEXT":
        return "bg-yellow-100 text-yellow-700";
      case "NORMAL":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredData = expirations.filter(
    (item) =>
      item.clientName.toLowerCase().includes(search.toLowerCase()) ||
      String(item.saleId).includes(search),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">Carregando vencimentos...</span>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen p-6 flex flex-col bg-white text-base overflow-hidden">
      <ListPageHeader
        title="Vencimentos"
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit max-h-full flex flex-col">
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="sticky top-0 z-10 bg-gray-50">
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="w-[80px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="w-[120px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Venda
                  </th>
                  <th className="w-[140px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Data Venda
                  </th>
                  <th className="w-[140px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Vence Em
                  </th>
                  <th className="w-[140px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="w-[100px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item.expirationId}
                      className="group hover:bg-gray-50/80 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-3.5 text-sm text-gray-500">
                        {item.expirationNumber}
                      </td>

                      <td
                        className="px-6 py-3.5 text-sm font-bold text-gray-800 truncate"
                        title={item.clientName}
                      >
                        {item.clientName}
                      </td>

                      <td className="px-6 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                        #{item.saleId}
                      </td>

                      <td className="px-6 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(item.saleDate).toLocaleDateString("pt-BR")}
                      </td>

                      <td className="px-6 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(item.dueDate).toLocaleDateString("pt-BR")}
                      </td>

                      <td className="px-6 py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full ${getStatusClasses(item.status)}`}
                        >
                          {getStatusLabel(item.status)}
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-gray-400"
                    >
                      Nenhum vencimento encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1 min-h-[20px]" />
      </div>

      {/* FOOTER */}
      <footer className="mt-auto flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-medium text-gray-500 shrink-0 py-6">
        <div className="flex items-center gap-2">
          <span>Linhas por página</span>
          <div className="relative">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="bg-transparent font-bold text-gray-800 outline-none appearance-none pr-4 cursor-pointer"
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
            {from}-{to} de {total}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-400 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasNextPage}
              className="p-1.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E64D17] text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
