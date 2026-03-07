"use client";
import { 
  Menu, 
  Package, 
  Users, 
  Database, 
  ShoppingCart,
  CalendarClock,
  Settings 
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
    const iconSize = 28;

    return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-[#F2F2F2] border-r border-gray-200 flex flex-col items-center py-8 shadow-sm">
      <div className="flex flex-col items-center gap-10 w-full mb-auto">
        <button className="text-gray-800 hover:text-indigo-600 transition-colors">
          <Menu size={32} />
        </button>

        <nav className="flex flex-col items-center gap-10">
          <Link href="/base" className="text-gray-800 hover:text-indigo-600 transition-colors" title="Base">
            <Database size={iconSize} />
          </Link>
          <Link href="/clientes" className="text-gray-800 hover:text-indigo-600 transition-colors" title="Clientes">
            <Users size={iconSize} />
          </Link>
          <Link href="/produtos" className="text-gray-800 hover:text-indigo-600 transition-colors" title="Produtos">
            <Package size={iconSize} />
          </Link>
          <Link href="/vendas" className="text-gray-800 hover:text-indigo-600 transition-colors" title="Vendas">
            <ShoppingCart size={iconSize} />
          </Link>
          <Link href="/vencimentos" className="text-gray-800 hover:text-indigo-600 transition-colors" title="Controle de Vencimentos">
            <CalendarClock size={iconSize} />
          </Link>
        </nav>
      </div>

      <div className="mt-auto">
        <Link href="/settings" className="text-gray-800 hover:text-indigo-600 transition-colors">
          <Settings size={32} />
        </Link>
      </div>
        </aside>
    );
}