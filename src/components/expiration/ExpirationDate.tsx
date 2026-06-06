"use client";

import { Pencil, Trash2 } from "lucide-react";

const mockData = [
  {
    id: 1,
    cliente: "Mercado Silva",
    produto: "Extintor ABC",
    venda: "#15",
    dataVenda: "07/06/2025",
    vencimento: "07/07/2025",
    status: "Próximo",
  },
  {
    id: 2,
    cliente: "Loja XPTO",
    produto: "Mangueira",
    venda: "#22",
    dataVenda: "09/06/2025",
    vencimento: "09/07/2025",
    status: "Próximo",
  },
  {
    id: 3,
    cliente: "Empresa Y",
    produto: "Extintor CO2",
    venda: "#10",
    dataVenda: "02/05/2024",
    vencimento: "02/06/2025",
    status: "Vencido",
  },
];

export default function MaturityDate() {
  return (
    <div className="h-screen max-h-screen p-6 flex flex-col bg-white text-base overflow-hidden">
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold text-gray-900">
          Vencimentos
        </h1>
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit max-h-full flex flex-col">
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-gray-50">
                <tr className="border-b border-gray-100">
                  <th className="w-[80px] px-6 py-3 text-sm font-bold text-gray-500 uppercase text-center">
                    ID
                  </th>

                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase">
                    Cliente
                  </th>

                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase text-center">
                    Produto
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
                {mockData.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-gray-50/80 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500 font-semibold text-center">
                      {item.id}
                    </td>

                    <td className="px-6 py-4 text-sm font-bold text-gray-800">
                      {item.cliente}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 text-center">
                      {item.produto}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 text-center">
                      {item.venda}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 text-center whitespace-nowrap">
                      {item.dataVenda}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 text-center whitespace-nowrap">
                      {item.vencimento}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          item.status === "Próximo"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          className="text-[#FF5A1F] hover:text-[#E64D17] p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg cursor-pointer"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          className="text-[#FF5A1F] hover:text-[#E64D17] p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg cursor-pointer"
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
      </div>
    </div>
  );
}