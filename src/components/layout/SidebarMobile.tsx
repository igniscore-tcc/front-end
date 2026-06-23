"use client";

import {
  Package,
  Users,
  ShoppingCart,
  CalendarClock,
  Settings,
  LayoutDashboard,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarMobile() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/clientes", icon: Users, label: "Clientes" },
    { href: "/produtos", icon: Package, label: "Produtos" },
    { href: "/vendas", icon: ShoppingCart, label: "Vendas" },
    { href: "/vencimentos", icon: CalendarClock, label: "Vencimentos" },
    { href: "/configuracoes", icon: Settings, label: "Config" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around z-50 md:hidden">
      {navItems.map((item) => {
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-col items-center justify-center w-full h-full transition-colors ${
              active ? "text-[#FF5A1F]" : "text-gray-500"
            }`}
          >
            <item.icon size={22} />

            <span className="text-[10px] mt-1 leading-none">{item.label}</span>

            {active && (
              <div className="absolute top-0 w-10 h-0.5 bg-[#FF5A1F] rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
