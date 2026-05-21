"use client"

import { useState, useMemo, useEffect, useCallback } from "react";
import { Sale, SaleStatus } from "@/types/sale";
import { mockSales } from "@/mocks/sales";
import { Cliente } from "@/types/cliente";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { INTERNAL_API, getAuthHeaders } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";

interface CartItem {
  id: string;
  product: Product;
  units: number;
  price: number;
  total: number;
}

export function useSales() {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [hydrated, setHydrated] = useState(false);

  // Hidrata do localStorage apenas no cliente, após a montagem
  useEffect(() => {
    const stored = localStorage.getItem("sales_data");
    if (stored) {
      try {
        setSales(JSON.parse(stored));
      } catch {
        // Mantém mockSales se o JSON for inválido
      }
    }
    setHydrated(true);
  }, []);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: keyof Sale; dir: "asc" | "desc" }>({
    key: "id",
    dir: "desc",
  });

  const [filterStatus, setFilterStatus] = useState<"ALL" | "CONCLUDED" | "PENDING" | "CANCELLED">("ALL");

  // --- Estados da Nova Venda ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [clientSearch, setClientSearch] = useState("");
  const [showClientSuggestions, setShowClientSuggestions] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productSearch, setProductSearch] = useState("");
  const [showProductSuggestions, setShowProductSuggestions] = useState(false);
  const [priceInput, setPriceInput] = useState<number>(0);
  const [unitsInput, setUnitsInput] = useState<number>(1);

  const [paymentMethod, setPaymentMethod] = useState("Dinheiro");
  const [discountInput, setDiscountInput] = useState("0%");

  // Listas de Clientes e Produtos do Banco de Dados via API
  const [dbClients, setDbClients] = useState<Cliente[]>([]);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // Carrega clientes e produtos diretamente da API para as sugestões do PDV
  const loadSuggestions = useCallback(async () => {
    try {
      setLoadingSuggestions(true);

      // Buscar Clientes
      const clientsRes = await fetch(`${INTERNAL_API}/clients/findall?page=0&size=500`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (clientsRes.ok) {
        const result = await clientsRes.json();
        const data = Array.isArray(result.clients) ? result.clients : [];
        const formattedClients: Cliente[] = data.map((client: any) => ({
          id: Number(client.id),
          number: client.number,
          nome: client.name,
          tipo: client.cpf ? "PF" : "PJ",
          email: client.email,
          telefone: client.phone || "",
          cpf: client.cpf || "",
          cnpj: client.cnpj || "",
          inscricao: client.ie || "",
          uf: client.ufIe || "SP",
          observacao: client.obs || "",
        }));
        setDbClients(formattedClients);
      }

      // Buscar Produtos
      const productsRes = await fetch(`${INTERNAL_API}/products/findall?page=0&size=500`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (productsRes.ok) {
        const result = await productsRes.json();
        const data = Array.isArray(result)
          ? result
          : Array.isArray(result.content)
            ? result.content
            : [];
        const formattedProducts: Product[] = data.map((product: any) => ({
          id: Number(product.id),
          nome: product.name,
          tipo: product.type,
          lote: product.lot,
          validade: product.validity,
          preco: Number(product.price),
        }));
        setDbProducts(formattedProducts);
      }
    } catch (err) {
      console.error("Erro ao carregar dados para o PDV:", err);
    } finally {
      setLoadingSuggestions(false);
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Debounce da busca de vendas
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    let result = sales;

    if (filterStatus !== "ALL") {
      result = result.filter((sale) => {
        // Mapeia o enum de status da Venda para a string correta
        if (filterStatus === "CONCLUDED") return sale.status === SaleStatus.CONCLUDED;
        if (filterStatus === "PENDING") return sale.status === SaleStatus.PENDING;
        if (filterStatus === "CANCELLED") return sale.status === SaleStatus.CANCELLED;
        return true;
      });
    }

    return result.filter((sale) => {
      return (
        sale.id.toString().includes(term) ||
        sale.tipo.toLowerCase().includes(term) ||
        sale.status.toLowerCase().includes(term)
      );
    });
  }, [debouncedSearch, sales, filterStatus]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];

      if (sort.key === "total") {
        const numA = parseFloat(String(va).replace(/[^0-9,-]/g, "").replace(",", ".")) || 0;
        const numB = parseFloat(String(vb).replace(/[^0-9,-]/g, "").replace(",", ".")) || 0;
        return sort.dir === "asc" ? numA - numB : numB - numA;
      }

      if (va < vb) return sort.dir === "asc" ? -1 : 1;
      if (va > vb) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sort]);

  const paginatedSales = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return sorted.slice(startIndex, startIndex + perPage);
  }, [sorted, page, perPage]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const hasNextPage = page < totalPages;
  const from = filtered.length === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, filtered.length);

  const handleSort = (key: keyof Sale) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  };

  // Autocomplete Clientes
  const filteredClientSuggestions = useMemo(() => {
    if (!clientSearch.trim()) return [];
    const term = clientSearch.toLowerCase();
    return dbClients.filter(c => {
      const doc = c.tipo === "PF" ? c.cpf : c.cnpj;
      return (
        c.nome.toLowerCase().includes(term) ||
        (doc && doc.toLowerCase().includes(term))
      );
    }).slice(0, 5);
  }, [clientSearch, dbClients]);

  // Autocomplete Produtos
  const filteredProductSuggestions = useMemo(() => {
    if (!productSearch.trim()) return [];
    const term = productSearch.toLowerCase();
    return dbProducts.filter(p => {
      return (
        p.nome.toLowerCase().includes(term) ||
        (p.lote && p.lote.toLowerCase().includes(term))
      );
    }).slice(0, 5);
  }, [productSearch, dbProducts]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductSearch(product.nome);
    setPriceInput(product.preco);
    setUnitsInput(1);
    setShowProductSuggestions(false);
  };

  const clearProductSelection = () => {
    setSelectedProduct(null);
    setPriceInput(0);
    setUnitsInput(1);
  };

  const handleAddCartItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) {
      toast.error("Selecione um produto antes de adicionar.");
      return;
    }

    const currentItemTotal = priceInput * unitsInput;
    const existingIndex = cart.findIndex(item => item.product.id === selectedProduct.id);

    if (existingIndex > -1) {
      const updated = [...cart];
      const prevItem = updated[existingIndex];
      const newUnits = prevItem.units + unitsInput;
      updated[existingIndex] = {
        ...prevItem,
        units: newUnits,
        total: newUnits * prevItem.price
      };
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `${selectedProduct.id}-${Date.now()}`,
        product: selectedProduct,
        units: unitsInput,
        price: priceInput,
        total: currentItemTotal
      };
      setCart([...cart, newItem]);
    }

    // Reset campos
    setProductSearch("");
    setSelectedProduct(null);
    setPriceInput(0);
    setUnitsInput(1);
    toast.success("Item adicionado ao carrinho!");
  };

  const handleRemoveCartItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const finalizeSale = (finalTotal: number) => {
    if (cart.length === 0) {
      toast.error("Adicione itens à venda primeiro.");
      return false;
    }

    const newId = sales.length > 0 ? Math.max(...sales.map(s => s.id)) + 1 : 101;
    const newSale: Sale = {
      id: newId,
      total: formatCurrency(finalTotal),
      desconto: discountInput || "0%",
      data: new Date().toLocaleDateString("pt-BR"),
      tipo: paymentMethod,
      status: SaleStatus.CONCLUDED
    };

    const nextSales = [newSale, ...sales];
    setSales(nextSales);
    if (typeof window !== "undefined") {
      localStorage.setItem("sales_data", JSON.stringify(nextSales));
    }

    setCart([]);
    setSelectedClient(null);
    setDiscountInput("0%");
    toast.success(`Venda #${newId} realizada com sucesso!`);
    return true;
  };

  return {
    sales,
    pageData: paginatedSales,
    loading: !hydrated,
    total: filtered.length,
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

    // Estados POS
    cart,
    setCart,
    selectedClient,
    setSelectedClient,
    clientSearch,
    setClientSearch,
    showClientSuggestions,
    setShowClientSuggestions,
    selectedProduct,
    setSelectedProduct,
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
    dbClients,
    dbProducts,
    loadingSuggestions,
    loadSuggestions,

    // Autocomplete helpers
    filteredClientSuggestions,
    filteredProductSuggestions,

    // POS Actions
    handleSelectProduct,
    clearProductSelection,
    handleAddCartItem,
    handleRemoveCartItem,
    finalizeSale,
  };
}
