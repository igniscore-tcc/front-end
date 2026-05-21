"use client";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="
        relative
        overflow-hidden
        mt-24
        px-6
        md:px-10
        lg:px-16
        py-24
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(135deg,#FF5A1F_0%,#6D28D9_100%)]
        "
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-32
          -left-32
          w-[420px]
          h-[420px]
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-40
          -right-32
          w-[500px]
          h-[500px]
          rounded-full
          bg-[#FF5A1F]/20
          blur-3xl
        "
      />

      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-0
          opacity-[0.08]
          bg-[url('/backgroud-gradient.svg')]
          bg-cover
          bg-center
        "
      />

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          text-center
          gap-8
        "
      >
        <div className="flex flex-col gap-6">
          <p
            className="
              text-sm
              uppercase
              tracking-[0.15em]
              text-white/70
              font-semibold
            "
          >
            Plataforma operacional inteligente
          </p>

          <h2
            id="contact-title"
            className="
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-medium
              leading-[1.1]
              text-white
              max-w-5xl
            "
          >
            Modernize sua operação com o{" "}
            <span className="text-white/70">IgnisCore</span>
          </h2>

          <p
            className="
              text-base
              md:text-xl
              leading-relaxed
              text-white/85
              max-w-3xl
              mx-auto
            "
          >
            Centralize vendas, vencimentos, ordens de serviço e indicadores em
            uma única plataforma moderna, rápida e escalável.
          </p>
        </div>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            gap-4
          "
        >
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <Link
              href="/login"
              aria-label="Agendar demonstração da plataforma IgnisCore"
              className="
                group
                relative
                overflow-hidden
                flex
                items-center
                justify-center
                gap-3
                px-8
                py-4
                bg-white
                text-[#0B0F19]
                font-semibold
                transition-all
                duration-500
                hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)]
              "
            >
              <span className="relative z-10">Agendar demonstração</span>

              <ArrowUpRight
                width={20}
                height={20}
                className="
                  relative
                  z-10
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                  bg-[linear-gradient(135deg,rgba(255,90,31,0.08),transparent)]
                "
              />
            </Link>
          </motion.div>

          <Link
            href="#como-funciona"
            className="
              px-8
              py-4
              border
              border-white/20
              text-white/90
              backdrop-blur-xl
              transition-all
              duration-500
              hover:bg-white/10
              hover:border-white/40
            "
          >
            Ver funcionamento
          </Link>
        </div>
      </div>
    </section>
  );
}
