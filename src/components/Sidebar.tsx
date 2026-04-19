"use client";

import {
  Package,
  Users,
  NotebookText,
  ShoppingCart,
  CalendarClock,
  Settings,
  LayoutDashboard,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const iconSize = 24;
  const [tooltipResetKey, setTooltipResetKey] = useState(0);

  useEffect(() => {
    const handleBlur = () => setTooltipResetKey(prev => prev + 1);
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, []);

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/servicos", icon: NotebookText, label: "Ordem de Serviços" },
    { href: "/clientes", icon: Users, label: "Clientes" },
    { href: "/produtos", icon: Package, label: "Produtos" },
    { href: "/vendas", icon: ShoppingCart, label: "Vendas" },
    { href: "/vencimentos", icon: CalendarClock, label: "Vencimentos" },
  ];

  const getLinkClassName = (href: string) => {
    const isActive = pathname === href;
    const baseClasses = "transition-all duration-300 py-2 rounded-xl flex items-center group overflow-hidden w-full";
    const activeClasses = isActive 
      ? "bg-[#FF5A1F]/10 text-[#FF5A1F]" 
      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100";
    
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <aside 
      className={`fixed bottom-0 left-0 w-full h-16 bg-white border-t md:top-0 md:left-0 md:h-screen border-gray-100 flex flex-row md:flex-col items-center shadow-sm z-50 transition-all duration-300 ease-in-out ${
        isExpanded ? "md:w-64" : "md:w-20"
      }`}
    >
      <div className="flex flex-row md:flex-col items-center w-full h-full">
        <div className="hidden md:flex flex-col items-center py-8 w-full relative">
          {/* Novo Botão Toggle Flutuante */}
          <button
            onClick={onToggle}
            className="absolute -right-3 top-9 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-[#FF5A1F] hover:border-[#FF5A1F]/20 transition-all duration-300 z-50 group hover:scale-110 active:scale-95"
          >
            <ChevronLeft 
              size={14} 
              className={`transition-transform duration-500 ${!isExpanded ? "rotate-180" : ""}`}
              strokeWidth={3}
            />
          </button>

          <div className="flex items-center w-full px-4 overflow-hidden">
            <div className="w-12 flex flex-none items-center justify-center">
              <Image src="/igniscore.png" alt="IgnisCore Logo" width={28} height={38} className="object-contain" />
            </div>
            <span className={`ml-3 font-bold text-xl text-[#FF5A1F] whitespace-nowrap transition-all duration-300 ${
              isExpanded ? "opacity-100 visible" : "opacity-0 invisible w-0"
            }`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
              IgnisCore
            </span>
          </div>
        </div>

        <nav className="flex flex-row md:flex-col items-center justify-around md:justify-start w-full md:flex-1 md:gap-4 md:py-4">
          <TooltipProvider key={tooltipResetKey} delayDuration={300}>
            {navItems.map((item) => {
              const link = (
                <div key={item.href} className="w-full px-2">
                  <Link
                    href={item.href}
                    className={getLinkClassName(item.href)}
                  >
                    <div className="w-16 flex-none flex items-center justify-center">
                      <item.icon size={iconSize} />
                    </div>
                    <span className={`ml-2 font-bold whitespace-nowrap transition-all duration-300 ${
                      isExpanded ? "opacity-100 visible" : "opacity-0 invisible w-0"
                    } text-base font-sans`}>
                      {item.label}
                    </span>
                  </Link>
                </div>
              );

              if (isExpanded) return link;

              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <div className="w-full">
                      {link}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="hidden md:block font-medium">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}

            <div className="md:mt-auto w-full px-2">
              {(() => {
                const configLink = (
                  <Link
                    href="/configuracoes"
                    className={getLinkClassName("/configuracoes")}
                  >
                    <div className="w-16 flex-none flex items-center justify-center">
                      <Settings size={iconSize} />
                    </div>
                    <span className={`ml-2 font-bold whitespace-nowrap transition-all duration-300 ${
                      isExpanded ? "opacity-100 visible" : "opacity-0 invisible w-0"
                    } text-base font-sans`}>
                      Configurações
                    </span>
                  </Link>
                );

                if (isExpanded) return configLink;

                return (
                  <Tooltip key="config-tooltip">
                    <TooltipTrigger asChild>
                      <div className="w-full">
                        {configLink}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="hidden md:block font-medium">
                      <p>Configurações</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })()}
            </div>
          </TooltipProvider>
        </nav>
      </div>
    </aside>
  );
}
