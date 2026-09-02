"use client";

import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Building2,
  MoreVertical,
  Pencil,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { ListPageHeader } from "../shared/ListPageHeader";
import { AddClientModal } from "./AddClientModal";
import { ConfirmDialog } from "../shared/DeleteConfirmModal";
import { formatCnpj, formatPhone, formatCpf } from "@/lib/validators";
import { useClients } from "@/hooks/useClients";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/me";
import { Button } from "../ui/button";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DataPagination } from "../layout/pagination/pagination";

export default function Clients() {
  const router = useRouter();

  const {
    pageData,
    loading,
    total,
    totalPages,
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
    addClient,
    editing,
    setEditing,
    saveEdit,
    removeClient,
    deleting,
    setDeleting,
    filterTipo,
    setFilterTipo,
  } = useClients();

  const { user } = useAuth();

  const nomeSortIcon =
    sort.key !== "nome" ? (
      <ArrowUpDown size={14} />
    ) : sort.dir === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );

  return (
    <div className="p-6 flex flex-col text-base">
      <ListPageHeader
        title="Clientes"
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAddClick={() => setShowModal(true)}
        addLabel="Novo cliente"
      />

      {/* FILTROS */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <ToggleGroup
          type="single"
          variant="outline"
          value={filterTipo}
          onValueChange={(value) => {
            if (value) {
              setFilterTipo(value as "ALL" | "PF" | "PJ");
              setPage(1);
            }
          }}
        >
          <ToggleGroupItem
            value="ALL"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            Todos
          </ToggleGroupItem>
          <ToggleGroupItem
            value="PF"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            Pessoa Física
          </ToggleGroupItem>
          <ToggleGroupItem
            value="PJ"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            Pessoa Jurídica
          </ToggleGroupItem>
        </ToggleGroup>

        <Button
          variant={sort.key === "nome" ? "default" : "outline"}
          size="sm"
          onClick={() => handleSort("nome")}
        >
          Nome {nomeSortIcon}
        </Button>
      </div>

      {/* TABELA */}
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Nome</TableHead>
              <TableHead className="w-[18%]">CPF / CNPJ</TableHead>
              <TableHead className="w-[12%]">Inscrição</TableHead>
              <TableHead className="w-[22%]">E-mail</TableHead>
              <TableHead className="w-[13%]">Telefone</TableHead>
              <TableHead className="w-[5%] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: perPage > 8 ? 8 : perPage }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-36" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell />
                </TableRow>
              ))
            ) : pageData.length > 0 ? (
              pageData.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex min-w-0 items-center gap-2">
                      <Badge variant="outline" className="shrink-0 gap-1">
                        {client.tipo === "PJ" ? (
                          <Building2 className="size-3" />
                        ) : (
                          <User className="size-3" />
                        )}
                        {client.tipo}
                      </Badge>
                      
                      <button
                        type="button"
                        className="min-w-0 truncate text-left font-medium text-foreground hover:underline"
                        onClick={() => router.push(`/clientes/${client.id}`)}
                        title={client.nome}
                      >
                        {client.nome}
                      </button>
                    </div>
                  </TableCell>

                  <TableCell className="whitespace-nowrap tabular-nums text-muted-foreground">
                    {client.tipo === "PF"
                      ? formatCpf(client.cpf)
                      : formatCnpj(client.cnpj)}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {client.tipo === "PJ" ? client.inscricao : "-"}
                  </TableCell>

                  <TableCell
                    className="truncate text-muted-foreground"
                    title={client.email}
                  >
                    {client.email}
                  </TableCell>

                  <TableCell className="whitespace-nowrap tabular-nums text-muted-foreground">
                    {formatPhone(client.telefone)}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Ações de ${client.nome}`}
                        >
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditing(client)}>
                          <Pencil />
                          Editar
                        </DropdownMenuItem>

                        {user?.role === UserRole.OWNER && (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setDeleting(client)}
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
                <TableCell colSpan={6} className="h-48">
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <Users className="size-8 text-muted-foreground" />
                    <p className="font-medium">Nenhum cliente encontrado</p>
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

      {/* MODAIS */}
      <AddClientModal
        isOpen={showModal || !!editing}
        onClose={() => {
          setShowModal(false);
          setEditing(null);
        }}
        onSave={editing ? saveEdit : addClient}
        clientToEdit={editing}
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
            removeClient(deleting.id);
          }
        }}
        title="Confirmar exclusão"
        description={
          <>
            Tem certeza que deseja excluir o cliente{" "}
            <strong className="text-foreground">"{deleting?.nome}"</strong>?
          </>
        }
        warning="Esta ação não poderá ser desfeita e todos os dados associados serão removidos."
        confirmText="Excluir"
      />
    </div>
  );
}
