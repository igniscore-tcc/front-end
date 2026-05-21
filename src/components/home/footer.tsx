"use client";

import Link from "next/link";

import { Mail, Phone, ArrowUpRight } from "lucide-react";

import { motion } from "framer-motion";
import Image from "next/image";

const navigation = [
  {
    title: "Navegação",
    links: [
      {
        label: "Desafios",
        href: "#desafios",
      },
      {
        label: "Soluções",
        href: "#solucoes",
      },
      {
        label: "Preços",
        href: "#precos",
      },
      {
        label: "Contato",
        href: "#contato",
      },
    ],
  },
  {
    title: "Institucional",
    links: [
      {
        label: "Termos de uso",
        href: "/termos",
      },
      {
        label: "Dúvidas frequentes",
        href: "/faq",
      },
      {
        label: "Política de privacidade",
        href: "/privacidade",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-[#B1B4B8]/10
        bg-[#0B0F19]
        px-6
        md:px-10
        lg:px-16
        pt-16
        pb-8
      "
    >
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          bg-[radial-gradient(circle_at_top_left,#FF5A1F,transparent_35%)]
        "
      />

      <div
        className="
          relative
          z-10
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-[1.2fr_1fr_1fr]
          gap-12
        "
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                items-center
                justify-center
                w-14
                h-14
                bg-[#FF5A1F]/10
                border
                border-[#FF5A1F]/20
              "
            >
              <Image
                width={28}
                height={28}
                src="/igniscore.png"
                alt="Dashboard da plataforma IgnisCore para gestão de empresas de extintores"
              ></Image>
            </div>

            <div className="flex flex-col">
              <h3
                className="
                  text-2xl
                  font-medium
                  text-white
                "
              >
                IgnisCore
              </h3>

              <p className="text-sm text-white/50">
                Gestão operacional inteligente
              </p>
            </div>
          </div>

          <p
            className="
              text-sm
              md:text-base
              leading-relaxed
              text-white/70
              max-w-md
            "
          >
            Plataforma desenvolvida para empresas de manutenção, revendas e
            prestadores de serviços que precisam de controle operacional moderno
            e centralizado.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:suporte@igniscore.com"
              className="
                flex
                items-center
                gap-3
                text-white/70
                transition-colors
                duration-300
                hover:text-[#FF5A1F]
              "
            >
              <Mail width={18} height={18} />

              <span>suporte@igniscore.com</span>
            </a>

            <a
              href="tel:+5519996779283"
              className="
                flex
                items-center
                gap-3
                text-white/70
                transition-colors
                duration-300
                hover:text-[#FF5A1F]
              "
            >
              <Phone width={18} height={18} />

              <span>(19) 99677-9283</span>
            </a>
          </div>
        </div>

        {navigation.map((group) => (
          <div key={group.title} className="flex flex-col gap-6">
            <h4
              className="
                text-lg
                font-medium
                text-white
              "
            >
              {group.title}
            </h4>

            <ul className="flex flex-col gap-4">
              {group.links.map((item) => (
                <li key={item.label}>
                  <motion.div
                    whileHover={{
                      x: 4,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="
                        group
                        flex
                        items-center
                        gap-2
                        text-white/65
                        transition-colors
                        duration-300
                        hover:text-[#FF5A1F]
                      "
                    >
                      <span>{item.label}</span>

                      <ArrowUpRight
                        width={16}
                        height={16}
                        className="
                          opacity-0
                          -translate-x-1
                          transition-all
                          duration-300
                          group-hover:opacity-100
                          group-hover:translate-x-0
                        "
                      />
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="
          relative
          z-10
          mt-14
          pt-8
          border-t
          border-white/10
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-4
        "
      >
        <p
          className="
            text-sm
            text-white/50
            text-center
            md:text-left
          "
        >
          © {new Date().getFullYear()} IgnisCore. Todos os direitos reservados.
        </p>

        <div
          className="
            flex
            items-center
            gap-6
          "
        >
          <Link
            href="/privacidade"
            className="
              text-sm
              text-white/50
              transition-colors
              duration-300
              hover:text-[#FF5A1F]
            "
          >
            Privacidade
          </Link>

          <Link
            href="/termos"
            className="
              text-sm
              text-white/50
              transition-colors
              duration-300
              hover:text-[#FF5A1F]
            "
          >
            Termos
          </Link>
        </div>
      </div>
    </footer>
  );
}
