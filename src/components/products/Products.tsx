"use client";

import { ArrowUp, ArrowDown, ArrowUpDown, Pencil, Trash2, MoreVertical } from "lucide-react";
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
import { Skeleton } from "../ui/skeleton";
import { DataPagination } from "../layout/pagination/pagination";
import { ConfirmDialog } from "../shared/DeleteConfirmModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
    deleting,
    setDeleting,
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
    <div className="p-6 flex flex-col text-base">
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
        <Table className="table-fixed w-full min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Nome</TableHead>
              <TableHead className="w-[15%]">Tipo</TableHead>
              <TableHead className="w-[15%]">Validade</TableHead>
              <TableHead className="w-[15%]">Lote</TableHead>
              <TableHead className="w-[10%] text-right">Preço</TableHead>
              <TableHead className="w-[5%] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: perPage > 8 ? 8 : perPage }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                  <TableCell />
                </TableRow>
              ))
            ) : pageData.length > 0 ? (
              pageData.map((product) => (
                <TableRow key={product.id}>
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

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Ações de ${product.nome}`}
                        >
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditing(product)}>
                          <Pencil />
                          Editar
                        </DropdownMenuItem>

                        {user?.role === UserRole.OWNER && (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setDeleting(product)}
                          >
                            <Trash2 />
                            Excluir
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
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

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open) {
            setDeleting(null);
          }
        }}
        onConfirm={() => {
          if (deleting) {
            removeProduct(deleting.id);
          }
        }}
        title="Excluir produto"
        description={
          <>
            Tem certeza que deseja excluir o produto{" "}
            <strong className="text-foreground">"{deleting?.nome}"</strong>?
          </>
        }
        warning="Esta ação não poderá ser desfeita."
        confirmText="Excluir"
      />
    </div>
  );
}
