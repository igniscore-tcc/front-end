"use client";

import {
  Menu,
  Package,
  Users,
  NotebookText,
  ShoppingCart,
  CalendarClock,
  Settings,
  LayoutDashboard,
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
    <aside className="fixed bottom-0 left-0 w-full h-16 bg-[#F2F2F2] border-t md:top-0 md:left-0 md:h-screen md:w-20 md:border-t-0 md:border-r border-gray-200 flex flex-row md:flex-col items-center shadow-sm z-50">
      <div className="flex flex-row md:flex-col items-center w-full h-full">
        <div className="hidden md:flex items-center justify-center pt-8 pb-4 w-full">
          <Button
            variant="ghost"
            size={"icon"}
            className="text-gray-800"
          >
            <Menu size={32} />
          </Button>
        </div>

        <nav className="flex flex-row md:flex-col items-center justify-around md:justify-start w-full md:flex-1 md:gap-6 md:pb-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="text-sidebar-foreground transition-all duration-200 p-2 rounded-xl flex items-center justify-center"
                >
                  <LayoutDashboard size={iconSize} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden md:block">
                <p>Dashboard</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/order"
                  className="text-sidebar-foreground transition-all duration-200 p-2 rounded-xl flex items-center justify-center"
                >
                  <NotebookText size={iconSize} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="md:hidden">
                <p>Ordem de Serviços</p>
              </TooltipContent>
              <TooltipContent side="right" className="hidden md:block">
                <p>Ordem de Serviços</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/clientes"
                  className="text-sidebar-foreground transition-all duration-200 p-2 rounded-xl flex items-center justify-center"
                >
                  <Users size={iconSize} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden md:block">
                <p>Clientes</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/produtos"
                  className="text-sidebar-foreground transition-all duration-200 p-2 rounded-xl flex items-center justify-center"
                >
                  <Package size={iconSize} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden md:block">
                <p>Produtos</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/vendas"
                  className="text-sidebar-foreground transition-all duration-200 p-2 rounded-xl flex items-center justify-center"
                >
                  <ShoppingCart size={iconSize} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden md:block">
                <p>Vendas</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/vencimentos"
                  className="text-sidebar-foreground transition-all duration-200 p-2 rounded-xl flex items-center justify-center"
                >
                  <CalendarClock size={iconSize} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden md:block">
                <p>Controle de Vencimentos</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/configuracoes"
                  className="text-sidebar-foreground transition-all duration-200 p-2 rounded-xl md:mt-auto flex items-center justify-center"
                >
                  <Settings size={28} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden md:block">
                <p>Configurações</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>
    </aside>
  );
}
