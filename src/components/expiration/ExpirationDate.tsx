"use client";

import { useExpiration } from "@/hooks/useExpiration";
import {
  Pencil,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function MaturityDate() {
  const {
    expirations,
    loading,
    total,
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
    hasNextPage,
    from,
    to,
  } = useExpiration();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "VENCIDO":
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
      case "VENCIDO":
        return "bg-red-100 text-red-700";

      case "NEXT":
        return "bg-yellow-100 text-yellow-700";

      case "NORMAL":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="h-screen max-h-screen p-6 flex flex-col bg-white text-base overflow-hidden">
      <header className="relative flex items-center justify-between min-h-12 mb-6 shrink-0 w-full isolate">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] shrink-0 max-w-[38%] sm:max-w-[32%] truncate relative z-20 pr-2">
          Vencimentos
        </h1>
      </header>

      <div className="h-[42px] mb-4" />
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit max-h-full flex flex-col">
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="sticky top-0 z-10 bg-gray-50">
                <tr className="border-b border-gray-100">
                  <th className="w-[80px] px-6 py-3 text-sm font-bold text-gray-500 uppercase text-center">
                    ID
                  </th>

                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase">
                    Cliente
                  </th>

                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase text-center">
                    Venda
                  </th>

                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase text-center">
                    Data Venda
                  </th>

                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase text-center">
                    Vence Em
                  </th>

                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase text-center">
                    Status
                  </th>

                  <th className="w-[100px] px-6 py-3 text-sm font-bold text-gray-500 uppercase text-center">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {expirations.map((item) => (
                  <tr
                    key={item.expirationId}
                    className="group hover:bg-gray-50/80 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500 font-semibold text-center">
                      {item.expirationId}
                    </td>

                    <td className="px-6 py-4 text-sm font-bold text-gray-800">
                      {item.clientName}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 text-center">
                      #{item.saleId}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 text-center whitespace-nowrap">
                      {new Date(item.saleDate).toLocaleDateString("pt-BR")}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 text-center whitespace-nowrap">
                      {new Date(item.dueDate).toLocaleDateString("pt-BR")}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
                          item.status,
                        )}`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          className="text-[#FF5A1F] hover:text-[#E64D17] p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          className="text-[#FF5A1F] hover:text-[#E64D17] p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg"
                        >
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
        <div className="flex-1 min-h-[20px]" />
      </div>
      {!loading && (
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
                className="bg-transparent font-bold text-gray-800 outline-none pr-4 appearance-none cursor-pointer"
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

          <div className="flex items-center gap-4">
            <span>
              {from}-{to} de {total}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-400 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!hasNextPage}
                className="p-1.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E64D17] text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
