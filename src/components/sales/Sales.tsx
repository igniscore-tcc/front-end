"use client";

import { useEffect, useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  X,
  MoreVertical,
  ShoppingCart,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataPagination } from "../layout/pagination/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { ListPageHeader } from "@/components/shared/ListPageHeader";
import { SaleStatus, Sale } from "@/types/sale";
import { useSales } from "@/hooks/useSales";
import NewSale from "@/components/sales/NewSale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const paymentLabels: Record<string, string> = {
  PIX: "PIX",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  BANK_SLIP: "Boleto",
};

const statusLabels: Record<SaleStatus, string> = {
  COMPLETED: "Concluída",
  PENDING: "Pendente",
  CANCELLED: "Cancelada",
};

const formatNumber = (value: number | string) => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return value;
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

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
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
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
    updateSaleStatus,
  } = useSales();

  useEffect(() => {
    if (view === "create") loadSuggestions();
  }, [view, loadSuggestions]);

  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const sortIcon = (key: keyof Sale) => {
    if (sort.key !== key) return <ArrowUpDown size={14} />;
    return sort.dir === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

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
    <div className="p-6 flex flex-col text-base">
      <ListPageHeader
        title="Vendas"
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAddClick={() => setView("create")}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-[140px] justify-start text-left font-normal ${!dateFrom && "text-muted-foreground"}`}
              >
                <CalendarIcon size={16} className="mr-2 h-4 w-4 shrink-0" />
                {dateFrom
                  ? format(parseISO(dateFrom), "dd/MM/yyyy")
                  : "Data inicial"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFrom ? parseISO(dateFrom) : undefined}
                onSelect={(date) => {
                  setDateFrom(date ? format(date, "yyyy-MM-dd") : "");
                  setPage(1);
                }}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>

          <span className="text-muted-foreground text-sm font-medium">até</span>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-[140px] justify-start text-left font-normal ${!dateTo && "text-muted-foreground"}`}
              >
                <CalendarIcon size={16} className="mr-2 h-4 w-4 shrink-0" />
                {dateTo ? format(parseISO(dateTo), "dd/MM/yyyy") : "Data final"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateTo ? parseISO(dateTo) : undefined}
                onSelect={(date) => {
                  setDateTo(date ? format(date, "yyyy-MM-dd") : "");
                  setPage(1);
                }}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>

          {(dateFrom || dateTo) && (
            <Button
              variant="ghost"
              onClick={() => {
                setDateFrom("");
                setDateTo("");
                setPage(1);
              }}
              className="group flex items-center gap-1.5 px-3 py-2 text-muted-foreground hover:text-destructive transition-all"
            >
              <X
                size={14}
                className="group-hover:rotate-90 transition-transform duration-200"
              />
              <span>Limpar</span>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as typeof filterStatus);
                setPage(1);
              }}
              className="px-4 py-2 pr-8 rounded-md text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors appearance-none outline-none cursor-pointer"
            >
              <option value="ALL">Todos os status</option>
              <option value="CONCLUDED">Concluídas</option>
              <option value="PENDING">Pendentes</option>
              <option value="CANCELLED">Canceladas</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="table-fixed w-full min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[5%] text-left">ID</TableHead>
              <TableHead className="w-[20%] text-left">Cliente</TableHead>
              <TableHead className="w-[10%] text-right">Total</TableHead>
              <TableHead className="w-[15%] text-center">Desconto</TableHead>
              <TableHead className="w-[15%] text-center">Data</TableHead>
              <TableHead className="w-[15%] text-center">Tipo Pgto.</TableHead>
              <TableHead className="w-[10%] text-center">Status</TableHead>
              <TableHead className="w-[10%] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: perPage > 8 ? 8 : perPage }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-36" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16 rounded-full mx-auto" />
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))
            ) : pageData.length > 0 ? (
              pageData.map((sale) => (
                <TableRow
                  key={sale.id}
                  onClick={() => setSelectedSale(sale)}
                  className="cursor-pointer"
                >
                  <TableCell className="text-muted-foreground tabular-nums">
                    {sale.id}
                  </TableCell>
                  <TableCell
                    className="font-semibold truncate max-w-[200px]"
                    title={sale.cliente?.nome}
                  >
                    {sale.cliente?.nome || "Não informado"}
                  </TableCell>
                  <TableCell className="text-right font-bold tabular-nums">
                    <span className="font-normal text-muted-foreground">
                      R$ 
                    </span>
                    {formatNumber(sale.total)}
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {sale.desconto}
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground whitespace-nowrap">
                    {sale.data}
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground font-medium">
                    {paymentLabels[sale.tipo] || sale.tipo}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        sale.status === SaleStatus.COMPLETED
                          ? "bg-green-100 text-green-700"
                          : sale.status === SaleStatus.PENDING
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {statusLabels[sale.status] || sale.status}
                    </span>
                  </TableCell>
                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-48">
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <ShoppingCart className="size-8 text-muted-foreground" />
                    <p className="font-medium">Nenhuma venda encontrada</p>
                    <p className="text-sm text-muted-foreground">
                      Tente ajustar a busca ou o filtro selecionado.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataPagination
        page={page}
        totalPages={totalPages}
        from={from}
        to={to}
        total={total}
        pageSize={perPage}
        onPageChange={setPage}
        onPageSizeChange={setPerPage}
      />

      {selectedSale && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedSale(null)}
        >
          <div
            className="bg-white w-full max-w-[900px] max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF5A1F]/10 flex items-center justify-center">
                  <ShoppingCart size={18} className="text-[#FF5A1F]" />
                </div>
                <span className="text-base font-semibold text-gray-800">Detalhes da Venda</span>
              </div>
              <button
                onClick={() => setSelectedSale(null)}
                className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              {/* Top summary */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs font-semibold text-[#FF5A1F] uppercase tracking-widest mb-1">Cliente</p>
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                    {selectedSale.cliente?.nome || "Cliente não informado"}
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">Venda #{selectedSale.id}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Total</p>
                  <p className="text-3xl font-black text-[#FF5A1F] tabular-nums">
                    R$ {formatNumber(selectedSale.total)}
                  </p>
                  {/* Status selector — top right */}
                  <Select
                    value={selectedSale.status}
                    onValueChange={(value) => {
                      updateSaleStatus(selectedSale.id, value);
                      setSelectedSale({ ...selectedSale, status: value as SaleStatus });
                    }}
                  >
                    <SelectTrigger
                      variant="pagination"
                      className={`h-8 w-auto px-3 rounded-lg text-xs font-semibold border-0 focus:ring-0 cursor-pointer transition-all ${
                        selectedSale.status === SaleStatus.COMPLETED
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : selectedSale.status === SaleStatus.PENDING
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100 shadow-xl p-1">
                      <SelectItem value="PENDING" className="rounded-lg cursor-pointer my-0.5 font-semibold text-yellow-700 focus:bg-yellow-50 focus:text-yellow-800">Pendente</SelectItem>
                      <SelectItem value="COMPLETED" className="rounded-lg cursor-pointer my-0.5 font-semibold text-green-700 focus:bg-green-50 focus:text-green-800">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Info pills */}
              <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5">
                  <CalendarIcon size={14} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{selectedSale.data}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5">
                  <span className="text-sm text-gray-400">Pagamento:</span>
                  <span className="text-sm font-semibold text-gray-700">{paymentLabels[selectedSale.tipo] || selectedSale.tipo}</span>
                </div>
                {Number(selectedSale.desconto) > 0 && (
                  <div className="flex items-center gap-2 bg-emerald-50 rounded-xl px-4 py-2.5">
                    <span className="text-sm text-emerald-600">Desconto: <span className="font-semibold">{selectedSale.desconto}</span></span>
                  </div>
                )}
              </div>

              {/* Items table */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Itens da Venda</p>
              <div className="rounded-2xl overflow-hidden border border-gray-100">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Produto</th>
                      <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Qtd</th>
                      <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {selectedSale.items?.length ? (
                      selectedSale.items.map((item) => (
                        <tr key={`${item.id}-${item.nome}`} className="hover:bg-gray-50/70 transition-colors">
                          <td className="px-5 py-4 text-sm text-gray-400 tabular-nums font-medium">{item.id}</td>
                          <td className="px-5 py-4 text-sm font-semibold text-gray-800">{item.nome}</td>
                          <td className="px-5 py-4 text-sm text-center text-gray-500 tabular-nums">{item.units}</td>
                          <td className="px-5 py-4 text-sm text-right font-bold text-gray-900 tabular-nums">
                            <span className="font-normal text-gray-400 mr-0.5">R$</span>
                            {formatNumber(item.total)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-10 text-gray-400 text-sm">Nenhum item encontrado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
