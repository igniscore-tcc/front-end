"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ListPageHeaderProps {
  title: string;
  search: string;
  onSearchChange: (value: string) => void;
  onAddClick?: () => void;
}

export function ListPageHeader({
  title,
  search,
  onSearchChange,
  onAddClick,
}: ListPageHeaderProps) {
  return (
    <header className="relative flex items-center justify-between mb-8">
      <h1>{title}</h1>

      <div className="absolute left-1/2 -translate-x-1/2">
        <Input
          type="text"
          placeholder="Procurar"
          className="w-xs"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {onAddClick && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                onClick={onAddClick}
                data-testid="buttonAdd"
                className="h-10 w-10 rounded-full"
              >
                <Plus />
                <span className="sr-only">Adicionar</span>
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              Adicionar
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </header>
  );
}