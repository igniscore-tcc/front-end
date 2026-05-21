"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Plus,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  ArrowLeft,
  X,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListPageHeader } from "@/components/shared/ListPageHeader";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SaleStatus, Sale } from "@/types/sale";
import { useSales } from "@/hooks/useSales";

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
    loadSuggestions,
    filteredClientSuggestions,
    filteredProductSuggestions,
    handleSelectProduct,
    clearProductSelection,
    handleAddCartItem,
    handleRemoveCartItem,
    finalizeSale,
  } = useSales();

  useEffect(() => {
    if (view === "create") {
      loadSuggestions();
    }
  }, [view, loadSuggestions]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.total, 0),
    [cart]
  );

  const discountValue = useMemo(() => {
    if (!discountInput.trim()) return 0;
    if (discountInput.endsWith("%")) {
      const pct = parseFloat(discountInput.replace("%", "")) || 0;
      return (subtotal * pct) / 100;
    }
    const val = parseFloat(discountInput.replace(/[^0-9.]/g, "")) || 0;
    return val;
  }, [discountInput, subtotal]);

  const finalTotal = useMemo(
    () => Math.max(0, subtotal - discountValue),
    [subtotal, discountValue]
  );

  const sortIcon = (key: keyof Sale) => {
    if (sort.key !== key) return <ArrowUpDown size={14} />;
    return sort.dir === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  const handleFinalize = () => {
    const success = finalizeSale(finalTotal);
    if (success) setView("list");
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
      <div className="h-screen max-h-screen p-6 flex flex-col bg-white text-base overflow-hidden">
        <header className="flex items-center justify-between mb-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setView("list")}
              className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-semibold text-[#1a1a1a]">Nova Venda</h1>
          </div>
        </header>

        <div className="flex-1 min-h-0 flex gap-6 overflow-hidden">
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto custom-scrollbar pr-2">
            <div className="mb-5">
              {selectedClient ? (
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF5A1F]/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[#FF5A1F]">
                      {selectedClient.nome.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">
                      {selectedClient.nome}
                    </p>
                    <p className="text-xs text-gray-400">
                      {selectedClient.tipo === "PJ"
                        ? selectedClient.cnpj
                        : selectedClient.cpf}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedClient(null)}
                    className="p-1 hover:bg-gray-200 text-gray-400 hover:text-gray-600 rounded-md transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    placeholder="Buscar cliente..."
                    value={clientSearch}
                    onChange={(e) => {
                      setClientSearch(e.target.value);
                      setShowClientSuggestions(true);
                    }}
                    onFocus={() => setShowClientSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowClientSuggestions(false), 200)
                    }
                    suffixIcon={<Search size={18} />}
                  />
                  {showClientSuggestions &&
                    filteredClientSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-gray-50">
                        {filteredClientSuggestions.map((c) => (
                          <div
                            key={c.id}
                            onMouseDown={() => {
                              setSelectedClient(c);
                              setClientSearch("");
                              setShowClientSuggestions(false);
                            }}
                            className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors text-sm flex justify-between items-center"
                          >
                            <span className="font-medium text-gray-700">
                              {c.nome}
                            </span>
                            <span className="text-xs text-gray-400">
                              {c.tipo === "PJ" ? c.cnpj : c.cpf}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              )}
            </div>

            <form
              onSubmit={handleAddCartItem}
              className="flex gap-3 mb-5 items-end"
            >
              <div className="flex-[3] relative">
                <Input
                  placeholder="Produto"
                  value={productSearch}
                  onChange={(e) => {
                    setProductSearch(e.target.value);
                    if (selectedProduct) clearProductSelection();
                    setShowProductSuggestions(true);
                  }}
                  onFocus={() => setShowProductSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowProductSuggestions(false), 200)
                  }
                  required
                />
                {showProductSuggestions &&
                  filteredProductSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-gray-50">
                      {filteredProductSuggestions.map((p) => (
                        <div
                          key={p.id}
                          onMouseDown={() => handleSelectProduct(p)}
                          className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors text-sm flex justify-between items-center"
                        >
                          <span className="font-medium text-gray-700">
                            {p.nome}
                          </span>
                          <span className="text-xs font-bold text-[#FF5A1F]">
                            {formatCurrency(p.preco)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              <div className="flex-[1.5]">
                <Input
                  placeholder="Preço"
                  type="number"
                  step="0.01"
                  value={priceInput || ""}
                  onChange={(e) =>
                    setPriceInput(parseFloat(e.target.value) || 0)
                  }
                  required
                />
              </div>

              <div className="flex-1">
                <Input
                  placeholder="Qtd"
                  type="number"
                  min="1"
                  value={unitsInput}
                  onChange={(e) =>
                    setUnitsInput(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  required
                />
              </div>

              <Button
                type="submit"
                className="bg-[#FF5A1F] hover:bg-[#E64D17] text-white font-bold h-[54px] px-6 rounded-lg cursor-pointer shrink-0"
              >
                <Plus size={20} />
              </Button>
            </form>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead className="sticky top-0 z-10 bg-gray-50">
                    <tr className="border-b border-gray-100">
                      <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Produto
                      </th>
                      <th className="w-[100px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                        Qtd
                      </th>
                      <th className="w-[140px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">
                        Preço
                      </th>
                      <th className="w-[140px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">
                        Total
                      </th>
                      <th className="w-[70px] px-6 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <tr
                          key={item.id}
                          className="group hover:bg-gray-50/80 transition-colors"
                        >
                          <td className="px-6 py-3.5 text-sm font-semibold text-gray-800 truncate">
                            {item.product.nome}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-center font-bold text-gray-600 tabular-nums">
                            {item.units}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-right text-gray-500 tabular-nums">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="px-6 py-3.5 text-sm text-right font-bold text-gray-800 tabular-nums">
                            {formatCurrency(item.total)}
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveCartItem(item.id)}
                              className="text-gray-300 hover:text-red-500 p-1 rounded transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-16 text-center text-gray-400"
                        >
                          Adicione produtos à venda
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="w-[320px] shrink-0 flex flex-col gap-5">
            <Select
              placeholder="Pagamento"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              options={[
                { value: "Dinheiro", label: "Dinheiro" },
                { value: "PIX", label: "PIX" },
                { value: "Cartão de Crédito", label: "Cartão de Crédito" },
                { value: "Débito", label: "Cartão de Débito" },
                { value: "Boleto", label: "Boleto" },
              ]}
            />

            <Input
              placeholder="Desconto (ex: 10% ou 50)"
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
            />

            <div className="bg-gray-50 rounded-xl p-5 flex flex-col gap-3 mt-auto">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatCurrency(subtotal)}</span>
              </div>
              {discountValue > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Desconto</span>
                  <span className="tabular-nums">
                    -{formatCurrency(discountValue)}
                  </span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-700">Total</span>
                <span className="text-2xl font-black text-[#FF5A1F] tabular-nums">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>

            <Button
              onClick={handleFinalize}
              className="w-full bg-[#FF5A1F] hover:bg-[#E64D17] text-white font-bold h-12 rounded-xl transition-all cursor-pointer"
            >
              Finalizar Venda
            </Button>
          </div>
        </div>
      </div>
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
        addButtonClassName="bg-[#FF5A1F] hover:bg-[#E64D17] text-white rounded-full w-12 h-12 flex items-center justify-center transition-all p-0 shrink-0 cursor-pointer shadow-md hover:scale-105 active:scale-95"
      />

      <div className="flex flex-wrap items-center gap-4 mb-4 shrink-0">
        <button
          type="button"
          onClick={() => handleSort("id")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
            sort.key === "id"
              ? "bg-[#FF5A1F]/10 text-[#FF5A1F] border-[#FF5A1F]/20 shadow-sm"
              : "bg-gray-100/50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
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
              : "bg-gray-100/50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Data{" "}
          {sort.key === "data" ? (
            sortIcon("data")
          ) : (
            <Calendar size={16} />
          )}
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
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="sticky top-0 z-10 bg-gray-50">
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="w-[80px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="w-[150px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="w-[120px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Desconto
                  </th>
                  <th className="w-[120px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="w-[130px] px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
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
                      <td className="px-6 py-3.5 text-sm text-gray-500 font-semibold">
                        #{sale.id}
                      </td>
                      <td className="px-6 py-3.5 text-sm font-bold text-gray-800">
                        {sale.total}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-600">
                        {sale.desconto}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                        {sale.data}
                      </td>
                      <td
                        className="px-6 py-3.5 text-sm text-gray-600 font-medium truncate"
                        title={sale.tipo}
                      >
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
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-gray-400"
                    >
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
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages))
              }
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
