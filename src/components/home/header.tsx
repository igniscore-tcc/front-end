"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-dvw z-50 bg-white">
      <div className="px-6 md:px-10 lg:px-16 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex gap-4 items-center transition-opacity duration-300 hover:opacity-80"
        >
          <Image
            src="/igniscore.png"
            alt="Igniscore Logo"
            width={36}
            height={48}
            className="object-contain"
            priority
          />

          <p className="text-[#FF5A1F] font-bold text-2xl tracking-[0.01em] leading-[1.3]">
            IgnisCore
          </p>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex gap-8 items-center">
            <li>
              <Link
                href="/#desafios"
                className="text-[#B1B4B8] transition-all duration-300 hover:text-[#FF5A1F]"
              >
                Desafios
              </Link>
            </li>

            <li>
              <Link
                href="/#solucoes"
                className="text-[#B1B4B8] transition-all duration-300 hover:text-[#FF5A1F]"
              >
                Soluções
              </Link>
            </li>

            <li>
              <Link
                href="/#precos"
                className="text-[#B1B4B8] transition-all duration-300 hover:text-[#FF5A1F]"
              >
                Preços
              </Link>
            </li>

            <li>
              <Link
                href="/#contato"
                className="text-[#B1B4B8] transition-all duration-300 hover:text-[#FF5A1F]"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <Link
          href="https://wa.me/551999679283?text=Olá,%20quero%20agendar%20uma%20demonstração%20do%20IgnisCore"
          target="_blank"
          className="
            hidden lg:flex
            items-center
            justify-center
            border border-[#FF5A1F]
            px-5 py-3
            text-[#FF5A1F]
            font-medium
            transition-all
            duration-300
            hover:bg-[#FF5A1F]
            hover:text-white
            hover:shadow-[0_0_30px_rgba(255,90,31,0.25)]
            "
        >
          Solicitar Demonstração
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-[#FF5A1F]"
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      <div
        className={`
          lg:hidden
          overflow-hidden
          transition-all
          duration-300
          ${menuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav className="px-6 md:px-10 pb-6">
          <ul className="flex flex-col gap-6 text-lg">
            <li>
              <Link
                href="/#desafios"
                onClick={() => setMenuOpen(false)}
                className="text-[#B1B4B8] transition-colors duration-300 hover:text-[#FF5A1F]"
              >
                Desafios
              </Link>
            </li>

            <li>
              <Link
                href="/#solucoes"
                onClick={() => setMenuOpen(false)}
                className="text-[#B1B4B8] transition-colors duration-300 hover:text-[#FF5A1F]"
              >
                Soluções
              </Link>
            </li>

            <li>
              <Link
                href="/#precos"
                onClick={() => setMenuOpen(false)}
                className="text-[#B1B4B8] transition-colors duration-300 hover:text-[#FF5A1F]"
              >
                Preços
              </Link>
            </li>

            <li>
              <Link
                href="/#contato"
                onClick={() => setMenuOpen(false)}
                className="text-[#B1B4B8] transition-colors duration-300 hover:text-[#FF5A1F]"
              >
                Contato
              </Link>
            </li>

            <li className="pt-2">
              <Link
                href="https://wa.me/5519996779283?text=Olá,%20quero%20agendar%20uma%20demonstração%20do%20IgnisCore"
                target="_blank"
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  border
                  border-[#FF5A1F]
                  px-5
                  py-3
                  text-[#FF5A1F]
                  font-medium
                  transition-all
                  duration-300
                  hover:bg-[#FF5A1F]
                  hover:text-white
                "
              >
                Solicitar Demonstração
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
