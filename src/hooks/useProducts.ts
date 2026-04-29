import { useState, useMemo } from "react";
import type { Product, ProductFormData } from "@/types/product";
import { mockProducts } from "@/mocks/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [sort, setSort] = useState<{ key: keyof Product; dir: "asc" | "desc" }>({
    key: "id",
    dir: "asc",
  });

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return products.filter((p) => 
      p.nome.toLowerCase().includes(term) || 
      p.tipo.toLowerCase().includes(term) ||
      p.lote.toLowerCase().includes(term)
    );
  }, [search, products]);

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
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);
  const hasNextPage = page < totalPages;

  const pageData = sorted.slice((page - 1) * perPage, page * perPage);

  const handleSort = (key: keyof Product) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  };

  const addProduct = (data: ProductFormData) => {
    const newProduct: Product = {
      ...data,
      id: Math.max(...products.map(p => p.id), 0) + 1,
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const saveEdit = (data: ProductFormData & { id?: number }) => {
    if (!data.id) return;
    setProducts(prev => prev.map(p => p.id === data.id ? { ...p, ...data } as Product : p));
    setEditing(null);
  };

  const removeProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
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
  };
}
