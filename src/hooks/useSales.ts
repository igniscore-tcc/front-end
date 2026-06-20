"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Sale, SaleStatus } from "@/types/sale";
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

const paymentMethodMap: Record<string, string> = {
  Dinheiro: "CASH",
  dinheiro: "CASH",
  CASH: "CASH",

  "Cartão de Crédito": "CREDIT_CARD",
  "cartão de crédito": "CREDIT_CARD",
  CREDIT_CARD: "CREDIT_CARD",

  "Cartão de Débito": "DEBIT_CARD",
  "cartão de débito": "DEBIT_CARD",
  DEBIT_CARD: "DEBIT_CARD",

  Pix: "PIX",
  pix: "PIX",
  PIX: "PIX",

  Boleto: "BANK_SLIP",
  boleto: "BANK_SLIP",
  BANK_SLIP: "BANK_SLIP",
};

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: keyof Sale; dir: "asc" | "desc" }>({
    key: "id",
    dir: "desc",
  });

  const [filterStatus, setFilterStatus] = useState<
    "ALL" | "CONCLUDED" | "PENDING" | "CANCELLED"
  >("ALL");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // Estados da Nova Venda
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

  // 2. Criar fetchSales()
  const fetchSales = useCallback(async () => {
    try {
      setLoading(true);

      // Busca todas as vendas (ou um limite alto) para que o filtro e paginação no front-end funcionem
      const response = await fetch(
        `${INTERNAL_API}/sales/findall?page=0&size=1000`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error("Erro ao buscar vendas");
      }

      const data = Array.isArray(result?.sales) ? result.sales : [];

      const formattedSales: Sale[] = data.map((sale: any) => ({
        id: Number(sale.id),
        numberSale: Number(sale.numberSale ?? 0),

        total: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(sale.total ?? 0)),

        desconto: sale.discount ? `${sale.discount}%` : "0%",

        data: sale.date ? new Date(sale.date).toLocaleDateString("pt-BR") : "-",
        rawDate: sale.date || undefined,

        tipo: sale.paymentMethod ?? "-",

        status: sale.status ?? SaleStatus.PENDING,

        cliente: sale.client
          ? {
              id: Number(sale.client.id),
              nome: sale.client.name,
              tipo: sale.client.cpf ? "PF" : "PJ",
              cpf: sale.client.cpf || "",
              cnpj: sale.client.cnpj || "",
              telefone: sale.client.phone || "",
              email: sale.client.email || "",
              inscricao: sale.client.ie || "",
              uf: sale.client.ufIe || "SP",
              observacao: sale.client.obs || "",
            }
          : undefined,

        items:
          sale.items?.map((item: any) => ({
            id: Number(item.id),
            nome: item.product?.name ?? "Produto",
            units: Number(item.quantity ?? 1),
            price: Number(item.unitPrice ?? 0),
            total: new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(item.total ?? 0)),
          })) ?? [],
      }));

      setSales(formattedSales);
    } catch (err) {
      console.error("Erro ao carregar vendas:", err);
      toast.error("Erro ao carregar vendas");
    } finally {
      setLoading(false);
    }
  }, []);

  // Função auxiliar para resetar o fluxo de vendas no front após concluir
  const clearCart = useCallback(() => {
    setCart([]);
    setSelectedClient(null);
    setClientSearch("");
    setSelectedProduct(null);
    setProductSearch("");
    setPriceInput(0);
    setUnitsInput(1);
    setDiscountInput("0%");
  }, []);

  const loadSuggestions = useCallback(async () => {
    try {
      setLoadingSuggestions(true);

      // Buscar Clientes
      const clientsRes = await fetch(
        `${INTERNAL_API}/clients/findall?page=0&size=100`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        },
      );

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
      const productsRes = await fetch(
        `${INTERNAL_API}/products/findall?page=0&size=100`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        },
      );

      if (productsRes.ok) {
        const result = await productsRes.json();
        const data = Array.isArray(result?.products) ? result.products : [];
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

  useEffect(() => {
    fetchSales();
    loadSuggestions();
  }, [fetchSales, loadSuggestions]);

  // Debounce da busca de vendas
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    let result = sales;

    if (filterStatus !== "ALL") {
      result = result.filter((sale) => {
        if (filterStatus === "CONCLUDED")
          return sale.status === SaleStatus.COMPLETED;
        if (filterStatus === "PENDING")
          return sale.status === SaleStatus.PENDING;
        if (filterStatus === "CANCELLED")
          return sale.status === SaleStatus.CANCELLED;
        return true;
      });
    }

    if (dateFrom || dateTo) {
      result = result.filter((sale) => {
        if (!sale.rawDate) return false;

        // Formatar para comparar no fuso horário local sem horas
        const saleDate = new Date(sale.rawDate);
        saleDate.setHours(0, 0, 0, 0);

        if (dateFrom) {
          // dataFrom vem como YYYY-MM-DD
          const [year, month, day] = dateFrom.split("-").map(Number);
          const fromDate = new Date(year, month - 1, day);
          if (saleDate < fromDate) return false;
        }

        if (dateTo) {
          const [year, month, day] = dateTo.split("-").map(Number);
          const toDate = new Date(year, month - 1, day);
          if (saleDate > toDate) return false;
        }

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
  }, [debouncedSearch, sales, filterStatus, dateFrom, dateTo]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];

      if (sort.key === "total") {
        const numA =
          parseFloat(
            String(va)
              .replace(/[^0-9,-]/g, "")
              .replace(",", "."),
          ) || 0;

        const numB =
          parseFloat(
            String(vb)
              .replace(/[^0-9,-]/g, "")
              .replace(",", "."),
          ) || 0;

        return sort.dir === "asc" ? numA - numB : numB - numA;
      }

      const valueA = String(va ?? "");
      const valueB = String(vb ?? "");

      if (valueA < valueB) return sort.dir === "asc" ? -1 : 1;
      if (valueA > valueB) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sort]);

  const effectiveTotal = sorted.length;
  const pageData = sorted.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(effectiveTotal / perPage);
  const hasNextPage = page < totalPages;
  const from = effectiveTotal === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, effectiveTotal);

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
    return dbClients
      .filter((c) => {
        const doc = c.tipo === "PF" ? c.cpf : c.cnpj;
        return (
          c.nome.toLowerCase().includes(term) ||
          (doc && doc.toLowerCase().includes(term))
        );
      })
      .slice(0, 5);
  }, [clientSearch, dbClients]);

  // Autocomplete Produtos
  const filteredProductSuggestions = useMemo(() => {
    if (!productSearch.trim()) return [];
    const term = productSearch.toLowerCase();
    return dbProducts
      .filter((p) => {
        return (
          p.nome.toLowerCase().includes(term) ||
          (p.lote && p.lote.toLowerCase().includes(term))
        );
      })
      .slice(0, 5);
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
    setProductSearch("");
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
    const existingIndex = cart.findIndex(
      (item) => item.product.id === selectedProduct.id,
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      const prevItem = updated[existingIndex];
      const newUnits = prevItem.units + unitsInput;
      updated[existingIndex] = {
        ...prevItem,
        units: newUnits,
        total: newUnits * prevItem.price,
      };
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `${selectedProduct.id}-${Date.now()}`,
        product: selectedProduct,
        units: unitsInput,
        price: priceInput,
        total: currentItemTotal,
      };
      setCart([...cart, newItem]);
    }

    setProductSearch("");
    setSelectedProduct(null);
    setPriceInput(0);
    setUnitsInput(1);
    toast.success("Item adicionado ao carrinho!");
  };

  const handleRemoveCartItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const finalizeSale = async () => {
    try {
      if (!selectedClient) {
        throw new Error("Selecione um cliente antes de finalizar a venda.");
      }
      if (cart.length === 0) {
        throw new Error("O carrinho está vazio.");
      }

      const mappedPayment = paymentMethodMap[paymentMethod] || "CASH";

      const payload = {
        clientId: Number(selectedClient.id),
        paymentMethod: mappedPayment,
        items: cart.map((item) => ({
          productId: Number(item.product.id),
          quantity: Number(item.units),
          unitPrice: Number(item.price),
        })),
      };

      const response = await fetch(`${INTERNAL_API}/sales/create`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const dataResult = await response.json();

      if (!response.ok) {
        throw new Error(dataResult.error || "Erro ao finalizar venda.");
      }

      clearCart();
      toast.success("Venda realizada com sucesso!");
      fetchSales(); // Atualiza o grid de vendas na interface automaticamente
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
    sales,
    pageData,
    loading,
    total: effectiveTotal,
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

    filteredClientSuggestions,
    filteredProductSuggestions,

    handleSelectProduct,
    clearProductSelection,
    handleAddCartItem,
    handleRemoveCartItem,
    finalizeSale,
    clearCart,
  };
}
