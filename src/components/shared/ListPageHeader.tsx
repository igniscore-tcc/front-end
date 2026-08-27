"use client";

import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ListPageHeaderProps {
  title: string;
  subtitle?: string;
  search: string;
  onSearchChange: (value: string) => void;
  onAddClick?: () => void;
  addLabel?: string;
}

export function ListPageHeader({
  title,
  subtitle,
  search,
  onSearchChange,
  onAddClick,
  addLabel = "Adicionar",
}: ListPageHeaderProps) {
  return (
    <header className="grid grid-cols-1 items-center gap-3 mb-6 sm:grid-cols-[1fr_auto_1fr]">
      <div>
        <h1>{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="w-full sm:w-xs sm:justify-self-center">
        <Input
          type="text"
          placeholder="Procurar"
          prefixIcon={<Search size={16} strokeWidth={2} />}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {onAddClick && (
        <div className="justify-self-end">
          <Button type="button" onClick={onAddClick} data-testid="buttonAdd">
            <Plus data-icon="inline-start" />
            {addLabel}
          </Button>
        </div>
      )}
    </header>
  );
}
