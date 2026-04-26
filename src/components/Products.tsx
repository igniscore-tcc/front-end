"use client";

import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

export default function Products() {
  const router = useRouter();
  const {
    pageData,
    loading,
    total,
    from,
    to,
    search,
    setSearch,
    sort,
    handleSort,
    page,
    setPage,
    perPage,
    setPerPage,
    setShowModal,
  } = useProducts();

  const sortIcon = (key: keyof Product) => {
    if (sort.key !== key) return <ArrowUpDown size={14} />;
    return sort.dir === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">Carregando produtos...</span>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-white font-sans text-base">
      <header className="flex items-center gap-6 mb-12">
        <h1 className="text-3xl font-bold text-[#1a1a1a] font-sans shrink-0">
          Produtos
        </h1>

        <div className="relative flex-1 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Procurar"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-gray-100/80 border-none rounded-full py-2.5 px-6 pl-12 focus:ring-2 focus:ring-[#FF5A1F]/20 focus:bg-white transition-all outline-none text-gray-700 font-medium font-sans"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <Button
          onClick={() => setShowModal(true)}
          className="bg-[#FF5A1F] hover:bg-[#E64D17] text-white rounded-full w-12 h-12 flex items-center justify-center transition-all shrink-0 p-0 cursor-pointer"
        >
          <Plus size={24} />
        </Button>
      </header>

      <div className="flex flex-wrap items-center gap-4 mb-8 font-sans">
        <button
          onClick={() => handleSort("id")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
            sort.key === "id"
              ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/10 shadow-sm"
              : "bg-gray-100/50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          ID {sortIcon("id")}
        </button>
        <button
          onClick={() => handleSort("nome")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
            sort.key === "nome"
              ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/10 shadow-sm"
              : "bg-gray-100/50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Nome {sortIcon("nome")}
        </button>
        <button
          onClick={() => handleSort("tipo")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
            sort.key === "tipo"
              ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/10 shadow-sm"
              : "bg-gray-100/50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Tipo {sortIcon("tipo")}
        </button>
        <button
          onClick={() => handleSort("validade")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
            sort.key === "validade"
              ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/10 shadow-sm"
              : "bg-gray-100/50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Validade {sortIcon("validade")}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-sans">
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Validade
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Lote
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pageData.length > 0 ? (
                pageData.map((product, idx) => (
                  <tr
                    key={idx}
                    className="group hover:bg-gray-50/80 transition-colors cursor-pointer"
                    onClick={() => router.push(`/produtos/${product.id}`)}
                  >
                    <td className="px-6 py-5 text-sm font-medium text-gray-500">
                      {product.id}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-800">
                      {product.nome}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {product.tipo}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {product.validade}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {product.lote}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-800">
                      {formatCurrency(product.preco)}
                    </td>
                    <td className="px-6 py-5 text-sm text-center">
                      <div className="flex items-center justify-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="text-[#FF5A1F] hover:text-[#E64D17] transition-colors p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="text-[#FF5A1F] hover:text-[#E64D17] transition-colors p-1.5 hover:bg-[#FF5A1F]/10 rounded-lg"
                        >
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
                    Nenhum produto encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-medium text-gray-500 font-sans">
        <div className="flex items-center gap-2">
          <span>Linhas por página</span>
          <div className="relative">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="bg-transparent border-none focus:ring-0 cursor-pointer font-bold text-gray-800 outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
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
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={to >= total}
              className="p-1.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E64D17] text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
