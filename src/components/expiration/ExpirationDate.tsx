"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataPagination } from "../layout/pagination/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { ListPageHeader } from "@/components/shared/ListPageHeader";
import { useExpiration } from "@/hooks/useExpiration";

export default function MaturityDate() {
  const {
    expirations,
    loading,
    total,
    page,
    setPage,
    perPage,
    setPerPage,
    from,
    to,
    hasNextPage,
  } = useExpiration();

  const [search, setSearch] = useState("");

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "EXPIRED":
        return "Vencido";
      case "NEXT":
        return "Próximo";
      case "NORMAL":
        return "Normal";
      default:
        return status;
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "EXPIRED":
        return "bg-red-100 text-red-700";
      case "NEXT":
        return "bg-yellow-100 text-yellow-700";
      case "NORMAL":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredData = expirations.filter(
    (item) =>
      item.clientName.toLowerCase().includes(search.toLowerCase()) ||
      String(item.saleId).includes(search),
  );


  return (
    <div className="p-6 flex flex-col text-base">
      <ListPageHeader
        title="Vencimentos"
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <div className="overflow-x-auto mt-4">
        <Table className="table-fixed w-full min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Cliente</TableHead>
              <TableHead className="w-[15%]">Venda</TableHead>
              <TableHead className="w-[15%]">Data Venda</TableHead>
              <TableHead className="w-[15%]">Vence Em</TableHead>
              <TableHead className="w-[15%] text-center">Status</TableHead>
              <TableHead className="w-[10%] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16 rounded-full mx-auto" /></TableCell>
                  <TableCell />
                </TableRow>
              ))
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.expirationId}>
                  <TableCell
                    className="font-semibold truncate"
                    title={item.clientName}
                  >
                    {item.clientName}
                  </TableCell>

                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    #{item.saleId}
                  </TableCell>

                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {new Date(item.saleDate).toLocaleDateString("pt-BR")}
                  </TableCell>

                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {new Date(item.dueDate).toLocaleDateString("pt-BR")}
                  </TableCell>

                  <TableCell className="text-center">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full ${getStatusClasses(item.status)}`}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhum vencimento encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataPagination
        page={page}
        totalPages={Math.ceil(total / perPage) || 1}
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
