"use client";

import { ArrowUp, ArrowDown, ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { ListPageHeader } from "../shared/ListPageHeader";
import { Product, ProductFormData } from "@/types/product";
import { PRODUCT_TYPE_OPTIONS } from "@/lib/constants";
import { ProductModal } from "./ProductModal";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/me";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { DataPagination } from "../layout/pagination/pagination";

export default function Products() {
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
    showModal,
    setShowModal,
    addProduct,
    editing,
    setEditing,
    saveEdit,
    removeProduct,
  } = useProducts();

  const { user } = useAuth();

  const handleSave = async (data: ProductFormData & { id?: number }) => {
    if (data.id) {
      await saveEdit(data);
    } else {
      await addProduct(data);
    }
  };

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
    <div className="max-h-screen p-6 flex flex-col text-base overflow-hidden">
      <ListPageHeader
        title="Produtos"
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAddClick={() => setShowModal(true)}
      />

      {/* FILTROS */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Button
          variant={sort.key === "id" ? "default" : "outline"}
          onClick={() => handleSort("id")}
        >
          ID
          {sortIcon("id")}
        </Button>

        <Button
          variant={sort.key === "nome" ? "default" : "outline"}
          onClick={() => handleSort("nome")}
        >
          Nome
          {sortIcon("nome")}
        </Button>

        <Button
          variant={sort.key === "tipo" ? "default" : "outline"}
          onClick={() => handleSort("tipo")}
        >
          Tipo
          {sortIcon("tipo")}
        </Button>

        <Button
          variant={sort.key === "validade" ? "default" : "outline"}
          onClick={() => handleSort("validade")}
        >
          Validade
          {sortIcon("validade")}
        </Button>
      </div>

      {/* TABELA */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageData.length > 0 ? (
              pageData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="tabular-nums">
                    {product.numberProduct}
                  </TableCell>

                  <TableCell>
                    <div className="min-w-0">
                      <span
                        className="block truncate font-semibold"
                        title={product.nome}
                      >
                        {product.nome}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {PRODUCT_TYPE_OPTIONS.find(
                        (option) => option.value === product.tipo,
                      )?.label || product.tipo}
                    </Badge>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {product.validade
                      ? product.validade.split("-").reverse().join("/")
                      : "-"}
                  </TableCell>

                  <TableCell className="whitespace-nowrap tabular-nums">
                    {product.lote || "-"}
                  </TableCell>

                  <TableCell className="text-right font-semibold tabular-nums whitespace-nowrap">
                    {formatCurrency(product.preco)}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditing(product)}
                        aria-label={`Editar ${product.nome}`}
                      >
                        <Pencil />
                      </Button>

                      {user?.role === UserRole.OWNER && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeProduct(product.id)}
                          aria-label={`Excluir ${product.nome}`}
                        >
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum produto encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINAÇÃO */}
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

      {/* MODAL */}
      <ProductModal
        isOpen={showModal || !!editing}
        onClose={() => {
          setShowModal(false);
          setEditing(null);
        }}
        onSave={handleSave}
        productToEdit={editing}
      />
    </div>
  );
}
