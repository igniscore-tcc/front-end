"use client";

import { useMemo } from "react";
import { Search, Plus, ArrowLeft, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, INPUT_FIELD_HEIGHT_CLASS } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Cliente } from "@/types/cliente";
import { Product } from "@/types/product";

interface CartItem {
  id: string;
  product: Product;
  units: number;
  price: number;
  total: number;
}

interface NewSaleProps {
  onBack: () => void;
  cart: CartItem[];
  selectedClient: Cliente | null;
  setSelectedClient: (client: Cliente | null) => void;
  clientSearch: string;
  setClientSearch: (v: string) => void;
  showClientSuggestions: boolean;
  setShowClientSuggestions: (v: boolean) => void;
  selectedProduct: Product | null;
  productSearch: string;
  setProductSearch: (v: string) => void;
  showProductSuggestions: boolean;
  setShowProductSuggestions: (v: boolean) => void;
  priceInput: number;
  setPriceInput: (v: number) => void;
  unitsInput: number;
  setUnitsInput: (v: number) => void;
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
  discountInput: string;
  setDiscountInput: (v: string) => void;
  filteredClientSuggestions: Cliente[];
  filteredProductSuggestions: Product[];
  handleSelectProduct: (p: Product) => void;
  clearProductSelection: () => void;
  handleAddCartItem: (e: React.FormEvent) => void;
  handleRemoveCartItem: (id: string) => void;
  finalizeSale: () => Promise<void>;
}

export default function NewSale({
  onBack,
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
}: NewSaleProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.total, 0),
    [cart],
  );

  const discountValue = useMemo(() => {
    if (!discountInput.trim()) return 0;
    if (discountInput.endsWith("%")) {
      const pct = parseFloat(discountInput.replace("%", "")) || 0;
      return (subtotal * pct) / 100;
    }
    return parseFloat(discountInput.replace(/[^0-9.]/g, "")) || 0;
  }, [discountInput, subtotal]);

  const finalTotal = useMemo(
    () => Math.max(0, subtotal - discountValue),
    [subtotal, discountValue],
  );

  // 🛠️ CORRIGIDO: Executa a função do hook e volta para a listagem
  const handleFinalize = async () => {
    try {
      await finalizeSale();
      onBack();
    } catch (error) {
      console.error("Erro ao finalizar a venda:", error);
    }
  };

  return (
    <div className="h-screen max-h-screen p-6 flex flex-col bg-white text-base overflow-hidden">
      <header className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-semibold text-[#1a1a1a]">Nova Venda</h1>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex gap-6 overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto custom-scrollbar pr-2">
          <section className="bg-white border border-zinc-200 rounded-2xl p-5 mb-6">
            <div className="mb-4">
              <h2 className="font-bold text-lg text-zinc-900">1. Cliente</h2>
              <p className="text-sm text-zinc-700">
                Selecione quem está realizando a compra
              </p>
            </div>
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
          </section>

          <section className="bg-white border border-zinc-200 rounded-2xl p-5 mb-6">
            <div className="mb-4">
              <h2 className="font-bold text-lg">2. Produtos</h2>

              <p className="text-sm text-zinc-700">
                Adicione os produtos da venda
              </p>
            </div>

            <form
              onSubmit={handleAddCartItem}
              className="flex gap-3 mb-5 items-end"
            >
              <div className="flex-3 relative [&>div]:mb-0 [&>div]:h-14">
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

              <div className="flex-[1.5] [&>div]:mb-0 [&>div]:h-14">
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

              <div className="flex-1 [&>div]:mb-0 [&>div]:h-14">
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

              <button
                type="submit"
                className="shrink-0 flex h-14 w-20 items-center justify-center rounded-lg bg-[#FF5A1F] text-white hover:bg-[#E64D17] transition-colors cursor-pointer"
                aria-label="Adicionar item"
              >
                <Plus size={20} />
              </button>
            </form>
          </section>

          <section className="bg-white border border-zinc-200 rounded-2xl p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-lg">3. Itens da Venda</h2>

                <p className="text-sm text-zinc-700">
                  {cart.length} produto(s) adicionados
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead className="sticky top-0 z-10 bg-gray-50">
                    <tr className="border-b border-gray-100">
                      <th className="px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Produto
                      </th>
                      <th className="w-25 px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                        Qtd
                      </th>
                      <th className="w-35 px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">
                        Preço
                      </th>
                      <th className="w-35 px-6 py-3 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">
                        Total
                      </th>
                      <th className="w-17.5 px-6 py-3" />
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
          </section>
        </div>

        <div className="sticky top-6 flex flex-col gap-5">
          <section className="bg-white border border-zinc-200 rounded-2xl p-5">
            <h2 className="font-bold text-lg mb-2">4. Pagamento</h2>

            <p className="text-sm text-zinc-700 mb-4">
              Escolha a forma de pagamento
            </p>

            <div className="w-[320px] shrink-0 flex flex-col gap-5">
              <Select
                placeholder="Pagamento"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                options={[
                  { value: "cash", label: "Dinheiro" },
                  { value: "pix", label: "PIX" },
                  { value: "credit_card", label: "Cartão de Crédito" },
                  { value: "debit_card", label: "Cartão de Débito" },
                  { value: "bank_slip", label: "Boleto" },
                ]}
              />

              <Input
                placeholder="Desconto %"
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value)}
              />
            </div>
          </section>

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col gap-4">
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
              <span className="text-4xl font-black text-[#FF5A1F] tabular-nums">
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
