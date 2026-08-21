"use client";

import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  ChevronDown,
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
import { DataPagination } from "../layout/pagination/pagination";

export default function Clients() {
  const router = useRouter();

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

  console.log("USER:", user);

  const sortIcon = (key: "id" | "nome") => {
    if (sort.key !== key) return <ArrowUpDown size={14} />;
    return sort.dir === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">Carregando clientes...</span>
      </div>
    );
  }

  return (
    <div className="max-h-screen p-6 flex flex-col text-base overflow-hidden">
      <ListPageHeader
        title="Clientes"
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

        <ToggleGroup
          type="single"
          value={filterTipo}
          onValueChange={(value) => {
            if (value) {
              setFilterTipo(value as "ALL" | "PF" | "PJ");
            }
          }}
          className="ml-auto"
        >
          <ToggleGroupItem value="ALL">Todos</ToggleGroupItem>

          <ToggleGroupItem value="PF">Pessoa Física</ToggleGroupItem>

          <ToggleGroupItem value="PJ">Pessoa Jurídica</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* TABELA */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>CPF / CNPJ</TableHead>
              <TableHead>Inscrição</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageData.length > 0 ? (
              pageData.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="tabular-nums">
                    {client.number}
                  </TableCell>

                  <TableCell>
                    <div className="flex min-w-0 items-center gap-2">
                      <Button
                        variant="link"
                        className="h-auto min-w-0 truncate p-0 text-left font-semibold"
                        onClick={() => router.push(`/clientes/${client.id}`)}
                        title={client.nome}
                      >
                        {client.nome}
                      </Button>

                      <Badge variant="secondary">{client.tipo}</Badge>
                    </div>
                  </TableCell>

                  <TableCell className="whitespace-nowrap tabular-nums">
                    {client.tipo === "PF"
                      ? formatCpf(client.cpf)
                      : formatCnpj(client.cnpj)}
                  </TableCell>

                  <TableCell>
                    {client.tipo === "PJ" ? client.inscricao : "-"}
                  </TableCell>

                  <TableCell className="truncate" title={client.email}>
                    {client.email}
                  </TableCell>

                  <TableCell className="whitespace-nowrap tabular-nums">
                    {formatPhone(client.telefone)}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditing(client)}
                        aria-label={`Editar ${client.nome}`}
                      >
                        <Pencil />
                      </Button>

                      {user?.role === UserRole.OWNER && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleting(client)}
                          aria-label={`Excluir ${client.nome}`}
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
                  Nenhum cliente encontrado
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
