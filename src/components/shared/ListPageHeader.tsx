"use client";

import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListPageHeaderProps {
  title: string;
  search: string;
  onSearchChange: (value: string) => void;
  onAddClick?: () => void;
  addButtonClassName?: string;
}

const DEFAULT_ADD_BUTTON_CLASS =
  "bg-[#FF5A1F] hover:bg-[#E64D17] text-white rounded-full w-12 h-12 flex items-center justify-center transition-all p-0 shrink-0";

export function ListPageHeader({
  title,
  search,
  onSearchChange,
  onAddClick,
  addButtonClassName = DEFAULT_ADD_BUTTON_CLASS,
}: ListPageHeaderProps) {
  return (
    <header className="relative flex items-center justify-between min-h-12 mb-6 shrink-0 w-full isolate">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] shrink-0 max-w-[38%] sm:max-w-[32%] truncate relative z-20 pr-2">
        {title}
      </h1>

      <div className="absolute left-1/2 top-1/2 z-10 w-[min(32rem,calc(100%-6.5rem))] sm:w-[min(32rem,calc(100%-9rem))] -translate-x-1/2 -translate-y-1/2 px-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Procurar"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-gray-100/80 rounded-full py-2.5 px-6 pl-12 border-2 border-transparent focus:outline-none focus:border-[#FF5A1F] focus:bg-white transition-all text-gray-700 font-medium"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      <div className="shrink-0 w-12 flex justify-end relative z-10">
        {onAddClick && (
          <Button onClick={onAddClick} className={addButtonClassName} id="buttonAdd">
            <Plus size={24} />
          </Button>
        )}
      </div>
    </header>
  );
}