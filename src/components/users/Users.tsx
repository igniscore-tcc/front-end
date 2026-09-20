"use client";

import { MoreVertical, Pencil, Trash2, User } from "lucide-react";
import { ListPageHeader } from "../shared/ListPageHeader";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DataPagination } from "../layout/pagination/pagination";

export default function Users() {
  const {
    users,
    loading,
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    total,
    totalPages,
    from,
    to,
    hasNextPage,
    hasPreviousPage,
  } = useUsers();

  return (
    <div className="p-6 flex flex-col text-base">
      <ListPageHeader
        title="Funcionários"
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onAddClick={() => {
          // Futuramente: abrir modal de novo funcionário
        }}
        addLabel="Novo funcionário"
      />

      {/* TABELA */}
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Nome</TableHead>
              <TableHead className="w-[35%]">E-mail</TableHead>
              <TableHead className="w-[20%]">Cargo</TableHead>
              <TableHead className="w-[15%] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({
                length: perPage > 8 ? 8 : perPage,
              }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-4 w-52" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>

                  <TableCell />
                </TableRow>
              ))
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <span
                      className="font-medium truncate block"
                      title={user.name}
                    >
                      {user.name}
                    </span>
                  </TableCell>

                  <TableCell
                    className="truncate text-muted-foreground"
                    title={user.email}
                  >
                    {user.email}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">{formatRole(user.role)}</Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Ações de ${user.name}`}
                        >
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            // Futuramente: editar usuário
                          }}
                        >
                          <Pencil />
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => {
                            // Futuramente: excluir usuário
                          }}
                        >
                          <Trash2 />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-48">
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <User className="size-8 text-muted-foreground" />

                    <p className="font-medium">Nenhum funcionário encontrado</p>

                    <p className="text-sm text-muted-foreground">
                      Tente ajustar a busca.
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
    </div>
  );
}

function formatRole(role: string) {
  switch (role) {
    case "OWNER":
      return "Proprietário";

    case "ADMIN":
      return "Administrador";

    case "EMPLOYEE":
      return "Funcionário";

    default:
      return role;
  }
}
