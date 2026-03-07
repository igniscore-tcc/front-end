"use client";

import {
  Menu,
  Package,
  Users,
  Database,
  ShoppingCart,
  CalendarClock,
  Settings,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const iconSize = 28;

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-[#F2F2F2] border-r border-gray-200 flex flex-col items-center py-8 shadow-sm">
      <div className="flex flex-col items-center gap-10 w-full mb-auto">
        <Button
          variant="ghost"
          size={"icon"}
          className="text-gray-800 hover:text-indigo-600"
        >
          <Menu size={32} />
        </Button>

        <nav className="flex flex-col items-center gap-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/base"
                  className="text-sidebar-foreground hover:text-primary transition-colors"
                >
                  <Database size={iconSize} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Base</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/clientes"
                  className="text-sidebar-foreground hover:text-primary transition-colors"
                >
                  <Users size={iconSize} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Clientes</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/produtos"
                  className="text-sidebar-foreground hover:text-primary transition-colors"
                >
                  <Package size={iconSize} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Produtos</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/vendas"
                  className="text-sidebar-foreground hover:text-primary transition-colors"
                >
                  <ShoppingCart size={iconSize} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Vendas</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/vencimentos"
                  className="text-sidebar-foreground hover:text-primary transition-colors"
                >
                  <CalendarClock size={iconSize} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Controle de Vencimentos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>

      <div className="mt-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className="text-sidebar-foreground hover:text-primary transition-colors"
              >
                <Settings size={32} />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Configurações</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}
