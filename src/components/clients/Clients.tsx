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
import { ListPageHeader } from "@/components/shared/ListPageHeader";
import { AddClientModal } from "./AddClientModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
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

                  <TableCell
                    className="truncate"
                    title={client.email}
                  >
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
      <footer className="mt-auto flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-medium text-gray-500 shrink-0 py-6">
        <div className="flex items-center gap-2">
          <span>Linhas por página</span>
          <div className="relative">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="bg-transparent font-bold text-gray-800 outline-none pr-4 appearance-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span>
            {from}-{to} de {total}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-400 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={!hasNextPage}
              className="p-1.5 rounded-lg bg-[#FF5A1F] hover:bg-[#E64D17] text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </footer>

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

      <DeleteConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => deleting && removeClient(deleting.id)}
        client={deleting}
      />
    </div>
  );
}
