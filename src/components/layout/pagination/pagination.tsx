import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface DataPaginationProps {
  page: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function DataPagination({
  page,
  totalPages,
  from,
  to,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: DataPaginationProps) {
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center mt-8 justify-center">
      <div className="flex items-center gap-4">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel htmlFor="select-rows-per-page">
            Linhas por página
          </FieldLabel>

          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              onPageSizeChange(Number(value));
              onPageChange(1);
            }}
          >
            <SelectTrigger
              className="w-20"
              id="select-rows-per-page"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {from}-{to} de {total}
        </span>
      </div>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();

                if (hasPreviousPage) {
                  onPageChange(page - 1);
                }
              }}
              className={
                !hasPreviousPage
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();

                if (hasNextPage) {
                  onPageChange(page + 1);
                }
              }}
              className={
                !hasNextPage
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}