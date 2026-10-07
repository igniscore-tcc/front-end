"use client";

import { ArrowLeft, Plus, Trash2, X } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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
    tipoDocumento: string;
    setTipoDocumento: (value: string) => void;
    documento: string;
    setDocumento: (value: string) => void;
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
    discountInput: number;
    setDiscountInput: (v: number) => void;
    filteredClientSuggestions: Cliente[];
    filteredProductSuggestions: Product[];
    handleSelectProduct: (p: Product) => void;
    clearProductSelection: () => void;
    handleAddCartItem: (e: React.FormEvent) => void;
    handleRemoveCartItem: (id: string) => void;
    finalizeSale: () => Promise<boolean>;
}

export default function NewSale({
    onBack,
    cart,
    selectedClient,
    setSelectedClient,
    clientSearch,
    setClientSearch,
    tipoDocumento,
    setTipoDocumento,
    documento,
    setDocumento,
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

    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.total, 0), [cart]);

    const discountValue = useMemo(() => {
        const discountStr = String(discountInput ?? "");

        if (!discountStr.trim()) return 0;

        if (discountStr.endsWith("%")) {
            const pct = parseFloat(discountStr.replace("%", "")) || 0;
            return (subtotal * pct) / 100;
        }

        return parseFloat(discountStr.replace(/[^0-9.]/g, "")) || 0;
    }, [discountInput, subtotal]);

    const finalTotal = useMemo(() => Math.max(0, subtotal - discountValue), [subtotal, discountValue]);

    const handleFinalize = async () => {
        if (!selectedClient) {
            toast.warning("Selecione um cliente antes de finalizar a venda");
            return;
        }

        if (cart.length === 0) {
            toast.warning("Adicione pelo menos um produto");
            return;
        }

        const ok = await finalizeSale();
        if (ok) onBack();
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Cabeçalho */}
            <header className="border-b bg-background">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Button type="button" variant="ghost" size="icon" onClick={onBack} aria-label="Voltar">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Nova Venda</h1>

                            <p className="text-sm text-muted-foreground">Registre uma nova venda</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_320px] items-start gap-6">
                    {/* ÁREA PRINCIPAL */}
                    <div className="min-w-0 space-y-6 flex flex-col">
                        {/* Informações da venda */}
                        <Card className="relative z-20 overflow-visible">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Informações da venda</CardTitle>

                                <CardDescription>Defina o documento e o cliente da venda</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="grid grid-cols-[180px_minmax(0,1fr)] gap-6">
                                    {/* Documento */}
                                    <div className="space-y-2 flex flex-col">
                                        <label className="text-sm font-medium">Documento</label>

                                        <Select value={tipoDocumento} onValueChange={value => setTipoDocumento(value)}>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Tipo" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="TAX_INVOICE">Nota Fiscal</SelectItem>
                                                <SelectItem value="SERVICE_ORDER">Ordem de Serviço</SelectItem>
                                                <SelectItem value="NONE">Nenhum</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Número */}
                                    <div className="space-y-2 flex flex-col">
                                        <label className="text-sm font-medium">Número do documento</label>

                                        <Input
                                            placeholder="Número do documento (opcional)"
                                            value={documento}
                                            onChange={e => setDocumento(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Separator className="my-5" />

                                {/* Cliente */}
                                <div className="space-y-2 flex flex-col">
                                    <label className="text-sm font-medium">Cliente</label>

                                    {selectedClient ? (
                                        <div className="flex items-center gap-3 border bg-muted/50 px-4 py-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary/10">
                                                <span className="text-sm font-bold text-primary">
                                                    {selectedClient.nome.charAt(0).toUpperCase()}
                                                </span>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold">{selectedClient.nome}</p>

                                                <p className="text-xs text-muted-foreground">
                                                    {selectedClient.tipo === "PJ"
                                                        ? selectedClient.cnpj
                                                        : selectedClient.cpf}
                                                </p>
                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 shrink-0"
                                                onClick={() => setSelectedClient(null)}
                                                aria-label="Remover cliente"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <Input
                                                placeholder="Buscar cliente por nome, CPF ou CNPJ..."
                                                value={clientSearch}
                                                onChange={e => {
                                                    setClientSearch(e.target.value);
                                                    setShowClientSuggestions(true);
                                                }}
                                                onFocus={() => setShowClientSuggestions(true)}
                                                onBlur={() => setTimeout(() => setShowClientSuggestions(false), 200)}
                                            />

                                            {showClientSuggestions && filteredClientSuggestions.length > 0 && (
                                                <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden border bg-popover text-popover-foreground shadow-md">
                                                    {filteredClientSuggestions.map(client => (
                                                        <button
                                                            type="button"
                                                            key={client.id}
                                                            onMouseDown={() => {
                                                                setSelectedClient(client);
                                                                setClientSearch("");
                                                                setShowClientSuggestions(false);
                                                            }}
                                                            className="flex w-full items-center justify-between border-b px-4 py-2.5 text-left text-sm last:border-b-0 hover:bg-accent hover:text-accent-foreground"
                                                        >
                                                            <span className="font-medium">{client.nome}</span>

                                                            <span className="text-xs text-muted-foreground">
                                                                {client.tipo === "PJ" ? client.cnpj : client.cpf}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Produtos */}
                        <Card className="relative overflow-visible">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Produtos</CardTitle>
                                <CardDescription>Adicione os produtos que fazem parte da venda</CardDescription>
                            </CardHeader>

                            <CardContent className="overflow-visible">
                                <form onSubmit={handleAddCartItem} className="flex items-end gap-3">
                                    <div className="relative flex-[3]">
                                        <label className="mb-2 block text-sm font-medium">Produto</label>

                                        <Input
                                            placeholder="Buscar produto..."
                                            value={productSearch}
                                            onChange={e => {
                                                setProductSearch(e.target.value);

                                                if (selectedProduct) {
                                                    clearProductSelection();
                                                }

                                                setShowProductSuggestions(true);
                                            }}
                                            onFocus={() => setShowProductSuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowProductSuggestions(false), 200)}
                                            required
                                        />

                                        {showProductSuggestions && filteredProductSuggestions.length > 0 && (
                                            <div className="absolute left-0 right-0 top-full z-[9999] mt-1 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
                                                {filteredProductSuggestions.map(product => (
                                                    <button
                                                        type="button"
                                                        key={product.id}
                                                        onMouseDown={() => handleSelectProduct(product)}
                                                        className="flex w-full items-center justify-between border-b px-4 py-2.5 text-left text-sm last:border-b-0 hover:bg-accent hover:text-accent-foreground"
                                                    >
                                                        <span className="font-medium">{product.nome}</span>

                                                        <span className="text-xs font-semibold text-primary">
                                                            {formatCurrency(product.preco)}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-[1.5]">
                                        <label className="mb-2 block text-sm font-medium">Preço</label>

                                        <Input
                                            placeholder="Preço"
                                            type="number"
                                            step="0.01"
                                            value={priceInput || ""}
                                            onChange={e => setPriceInput(parseFloat(e.target.value) || 0)}
                                            required
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label className="mb-2 block text-sm font-medium">Qtd.</label>

                                        <Input
                                            placeholder="Qtd"
                                            type="number"
                                            min="1"
                                            value={unitsInput}
                                            onChange={e => setUnitsInput(Math.max(1, parseInt(e.target.value) || 1))}
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="icon"
                                        className="h-10 w-10 shrink-0"
                                        aria-label="Adicionar item"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Itens */}
                        <Card>
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg">Itens da venda</CardTitle>

                                        <CardDescription>{cart.length} produto(s) adicionados</CardDescription>
                                    </div>

                                    {cart.length > 0 && (
                                        <span className="text-sm text-muted-foreground">
                                            {formatCurrency(subtotal)}
                                        </span>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="overflow-hidden border">
                                    <table className="w-full border-collapse text-left">
                                        <thead className="bg-muted">
                                            <tr className="border-b">
                                                <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">
                                                    Produto
                                                </th>

                                                <th className="w-24 px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
                                                    Qtd.
                                                </th>

                                                <th className="w-32 px-4 py-3 text-right text-sm font-semibold text-muted-foreground">
                                                    Preço
                                                </th>

                                                <th className="w-32 px-4 py-3 text-right text-sm font-semibold text-muted-foreground">
                                                    Total
                                                </th>

                                                <th className="w-14" />
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y">
                                            {cart.length > 0 ? (
                                                cart.map(item => (
                                                    <tr key={item.id} className="group hover:bg-muted/50">
                                                        <td className="max-w-0 truncate px-4 py-3 text-sm font-medium">
                                                            {item.product.nome}
                                                        </td>

                                                        <td className="px-4 py-3 text-center text-sm font-semibold tabular-nums">
                                                            {item.units}
                                                        </td>

                                                        <td className="px-4 py-3 text-right text-sm text-muted-foreground tabular-nums">
                                                            {formatCurrency(item.price)}
                                                        </td>

                                                        <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums">
                                                            {formatCurrency(item.total)}
                                                        </td>

                                                        <td className="px-3 py-3 text-center">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                                                onClick={() => handleRemoveCartItem(item.id)}
                                                                aria-label={`Remover ${item.product.nome}`}
                                                            >
                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={5}
                                                        className="px-6 py-12 text-center text-sm text-muted-foreground"
                                                    >
                                                        Nenhum produto adicionado
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RESUMO LATERAL */}
                    <aside className="sticky top-6 flex w-[320px] shrink-0 flex-col gap-5">
                        {/* Pagamento */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Pagamento</CardTitle>

                                <CardDescription>Defina como a venda será paga</CardDescription>
                            </CardHeader>

                            <CardContent className="flex flex-col gap-5">
                                <div className="space-y-2 flex flex-col">
                                    <label className="text-sm font-medium">Forma de pagamento</label>

                                    <Select value={paymentMethod || undefined} onValueChange={setPaymentMethod}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecionar pagamento" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="CASH">Dinheiro</SelectItem>
                                            <SelectItem value="PIX">PIX</SelectItem>
                                            <SelectItem value="CREDIT_CARD">Cartão de Crédito</SelectItem>
                                            <SelectItem value="DEBIT_CARD">Cartão de Débito</SelectItem>
                                            <SelectItem value="BANK_SLIP">Boleto</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2 flex flex-col">
                                    <label className="text-sm font-medium">Desconto</label>

                                    <Input
                                        placeholder="0,00"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={discountInput || ""}
                                        onChange={e => setDiscountInput(Number(e.target.value) || 0)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Total */}
                        <Card className="border-primary/20">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Resumo</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4 flex flex-col">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>

                                    <span className="font-medium tabular-nums">{formatCurrency(subtotal)}</span>
                                </div>

                                {discountValue > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Desconto</span>

                                        <span className="font-medium text-emerald-600 dark:text-emerald-400 tabular-nums">
                                            -{formatCurrency(discountValue)}
                                        </span>
                                    </div>
                                )}

                                <Separator />

                                <div className="space-y-1 flex flex-col">
                                    <span className="text-sm text-muted-foreground">Total da venda</span>

                                    <div className="text-3xl font-bold tracking-tight text-primary tabular-nums">
                                        {formatCurrency(finalTotal)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Button onClick={handleFinalize} className="h-12 w-full font-semibold">
                            Finalizar Venda
                        </Button>
                    </aside>
                </div>
            </main>
        </div>
    );
}
