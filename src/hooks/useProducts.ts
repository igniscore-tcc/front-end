import { useState, useMemo, useEffect, useCallback } from "react";
import type { Product, ProductFormData } from "@/types/product";
import { INTERNAL_API, getAuthHeaders } from "@/lib/api";
import { toast } from "sonner";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [sort, setSort] = useState<{
    key: keyof Product;
    dir: "asc" | "desc";
  }>({
    key: "id",
    dir: "asc",
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${INTERNAL_API}/products/findall?page=${page - 1}&size=${perPage}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao buscar produtos");
      }

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

      setProducts(formattedProducts);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }, [page, perPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();

    return products.filter(
      (p) =>
        p.nome.toLowerCase().includes(term) ||
        p.tipo.toLowerCase().includes(term) ||
        p.lote.toLowerCase().includes(term),
    );
  }, [products, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];

      if (typeof va === "number" && typeof vb === "number") {
        return sort.dir === "asc" ? va - vb : vb - va;
      }

      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();

      if (sa < sb) return sort.dir === "asc" ? -1 : 1;
      if (sa > sb) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sort]);

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const hasNextPage = page < totalPages;
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  const pageData = sorted.slice((page - 1) * perPage, page * perPage);

  const handleSort = (key: keyof Product) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));

    setPage(1);
  };

  const addProduct = async (data: ProductFormData) => {
    try {
      const payload = {
        name: data.nome,
        type: data.tipo,
        lot: data.lote,
        validity: data.validade,
        price: Number(data.preco),
      };

      const response = await fetch(`${INTERNAL_API}/products/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao cadastrar produto");
      }

      const newProduct: Product = {
        id: Number(result.id),
        nome: result.name,
        tipo: result.type,
        lote: result.lot,
        validade: result.validity,
        preco: Number(result.price),
      };

      setProducts((prev) => [...prev, newProduct]);
      setShowModal(false);

      toast.success("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao cadastrar produto",
      );
      throw error;
    }
  };

  const saveEdit = async (data: ProductFormData & { id?: number }) => {
    if (!data.id) return;

    try {
      const payload = {
        id: data.id,
        name: data.nome,
        type: data.tipo,
        lot: data.lote,
        validity: data.validade,
        price: Number(data.preco),
      };

      const response = await fetch(`${INTERNAL_API}/products/update`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao atualizar produto");
      }

      const updatedProduct: Product = {
        id: Number(result.id),
        nome: result.name,
        tipo: result.type,
        lote: result.lot,
        validade: result.validity,
        preco: Number(result.price),
      };

      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
      );

      setEditing(null);
      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar produto",
      );
      throw error;
    }
  };

  const removeProduct = async (id: number) => {
    try {
      const response = await fetch(`${INTERNAL_API}/products/delete/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao excluir produto");
      }

      setProducts((prev) => prev.filter((product) => product.id !== id));

      if (editing?.id === id) {
        setEditing(null);
      }

      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);

      toast.error(
        error instanceof Error ? error.message : "Erro ao excluir produto",
      );
    }
  };

  return {
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
    showModal,
    setShowModal,
    addProduct,
    editing,
    setEditing,
    saveEdit,
    removeProduct,
    refreshProducts: fetchProducts,
  };
}
