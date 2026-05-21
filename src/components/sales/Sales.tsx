"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import { ListPageHeader } from "@/components/shared/ListPageHeader";
import { SaleStatus, Sale } from "@/types/sale";
import { useSales } from "@/hooks/useSales";
import NewSale from "@/components/sales/NewSale";

export default function Sales() {
  const [view, setView] = useState<"list" | "create">("list");

  const {
    pageData,
    loading,
    total,
    totalPages,
    hasNextPage,
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
    filterStatus,
    setFilterStatus,
    loadSuggestions,
    cart,
    selectedClient,
    setSelectedClient,
    clientSearch,
    setClientSearch,
    showClientSuggestions,
    setShowClientSuggestions,
    selectedProduct,
    productSearch,
    setProductSearch,
    showProductSuggestions,
    setShowProductSuggestions,
    priceInput,
    setPriceInput,
    unitsInput,
    setUnitsInput,
    paymentMethod,
    setPaymentMethod,
    discountInput,
    setDiscountInput,
    filteredClientSuggestions,
    filteredProductSuggestions,
    handleSelectProduct,
    clearProductSelection,
    handleAddCartItem,
    handleRemoveCartItem,
    finalizeSale,
  } = useSales();

  useEffect(() => {
    if (view === "create") loadSuggestions();
  }, [view, loadSuggestions]);

  const sortIcon = (key: keyof Sale) => {
    if (sort.key !== key) return <ArrowUpDown size={14} />;
    return sort.dir === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">Carregando vendas...</span>
      </div>
    );
  }

  if (view === "create") {
    return (
      <NewSale
        onBack={() => setView("list")}
        cart={cart}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        clientSearch={clientSearch}
        setClientSearch={setClientSearch}
        showClientSuggestions={showClientSuggestions}
        setShowClientSuggestions={setShowClientSuggestions}
        selectedProduct={selectedProduct}
        productSearch={productSearch}
        setProductSearch={setProductSearch}
        showProductSuggestions={showProductSuggestions}
        setShowProductSuggestions={setShowProductSuggestions}
        priceInput={priceInput}
        setPriceInput={setPriceInput}
        unitsInput={unitsInput}
        setUnitsInput={setUnitsInput}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        discountInput={discountInput}
        setDiscountInput={setDiscountInput}
        filteredClientSuggestions={filteredClientSuggestions}
        filteredProductSuggestions={filteredProductSuggestions}
        handleSelectProduct={handleSelectProduct}
        clearProductSelection={clearProductSelection}
        handleAddCartItem={handleAddCartItem}
        handleRemoveCartItem={handleRemoveCartItem}
        finalizeSale={finalizeSale}
      />
    );
  }

  return (
    <div className="h-screen max-h-screen p-6 flex flex-col bg-white text-base overflow-hidden">
      <ListPageHeader
        title="Vendas"
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAddClick={() => setView("create")}
        addButtonClassName="bg-[#FF5A1F] hover:bg-[#E64D17] text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors p-0 shrink-0 cursor-pointer shadow-none"
      />

      <div className="flex flex-wrap items-center gap-4 mb-4 shrink-0">
        <button
          type="button"
          onClick={() => handleSort("id")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
            sort.key === "id"
              ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/20 shadow-sm"
              : "bg-gray-100/50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-transparent"
          }`}
        >
          ID {sortIcon("id")}
        </button>

        <button
          type="button"
          onClick={() => handleSort("data")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
            sort.key === "data"
              ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/20 shadow-sm"
              : "bg-gray-100/50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 border-transparent"
          }`}
        >
          Data {sort.key === "data" ? sortIcon("data") : <Calendar size={16} />}
        </button>

        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as typeof filterStatus);
              setPage(1);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border border-gray-200 transition-colors cursor-pointer bg-white text-gray-500 hover:bg-gray-50 appearance-none pr-9 outline-none"
          >
            <option value="ALL">Status: Todos</option>
            <option value="CONCLUDED">Concluídas</option>
            <option value="PENDING">Pendentes</option>
            <option value="CANCELLED">Canceladas</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit max-h-full flex flex-col">
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-gray-50">
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="w-[80px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                    ID
                  </th>
                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">
                    Total
                  </th>
                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                    Desconto
                  </th>
                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                    Data
                  </th>
                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                    Tipo Pgto.
                  </th>
                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                    Status
                  </th>
                  <th className="w-[100px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {pageData.length > 0 ? (
                  pageData.map((sale) => (
                    <tr
                      key={sale.id}
                      className="group hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-6 py-3.5 text-sm text-gray-500 font-semibold text-center">
                        {sale.id}
                      </td>
                      <td className="px-6 py-3.5 text-sm font-bold text-gray-800 text-right">
                        {sale.total}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-600 text-center">
                        {sale.desconto}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-600 whitespace-nowrap text-center">
                        {sale.data}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-600 font-medium text-center">
                        {sale.tipo}
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span
                          className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                            sale.status === SaleStatus.CONCLUDED
                              ? "bg-green-100 text-green-700"
                              : sale.status === SaleStatus.PENDING
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {sale.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-center">
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                      Nenhuma venda encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1 min-h-[20px]" />
      </div>

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
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-400 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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