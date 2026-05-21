"use client";

import Image from "next/image";

import { motion } from "framer-motion";

const markets = [
  {
    title: "Revendas de Extintores",
    description:
      "Controle estoque, vencimentos, movimentações e histórico completo dos equipamentos.",
    image: "/payments.svg",
  },
  {
    title: "Empresas de Manutenção",
    description:
      "Gerencie ordens de serviço, equipes técnicas e inspeções de forma centralizada.",
    image: "/contract.svg",
  },
  {
    title: "Prestadores de Serviços",
    description:
      "Acompanhe atendimentos, contratos e produtividade operacional em tempo real.",
    image: "/brief.svg",
  },
];

export default function Market() {
  return (
    <section
      id="mercado"
      aria-labelledby="market-title"
      className="
        relative
        overflow-hidden
        px-6
        md:px-10
        lg:px-16
        py-24
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          text-center
          gap-6
        "
      >
        <p
          className="
            text-sm
            uppercase
            tracking-[0.15em]
            text-[#FF5A1F]
            font-semibold
          "
        >
          Público-alvo
        </p>

        <h2
          id="market-title"
          className="
            text-4xl
            md:text-5xl
            text-[#B1B4B8]
            font-medium
            leading-[1.2]
            max-w-4xl
          "
        >
          <span className="text-[#FF5A1F]">Desenvolvido</span> para quem vive
          esse mercado
        </h2>

        <p
          className="
            text-base
            md:text-xl
            text-[#0B0F19]
            leading-relaxed
            max-w-3xl
          "
        >
          O IgnisCore foi projetado para empresas que precisam de controle
          operacional, produtividade e gestão centralizada.
        </p>
      </div>

      <div
        className="
          relative
          mt-16
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {markets.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="
              group
              relative
              overflow-hidden
              border
              border-[#B1B4B8]/20
              bg-white/70
              backdrop-blur-xl
              p-6
              md:p-8
              transition-all
              duration-500
              hover:border-[#FF5A1F]/40
              hover:-translate-y-2
            "
          >
            <div
              className="
                absolute
                inset-0
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-500
                bg-[radial-gradient(circle_at_top_left,rgba(255,90,31,0.08),transparent_70%)]
              "
            />

            <div
              className="
                relative
                z-10
                flex
                flex-col
                gap-10
              "
            >
              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#B1B4B8]/10
                  bg-[#F8F8F8]
                "
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  priority={index === 0}
                  className="
                    w-full
                    h-64
                    md:h-72
                    object-contain
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />
              </div>

              <div className="flex flex-col gap-4">
                <h3
                  className="
                    text-2xl
                    font-medium
                    text-[#B1B4B8]
                    transition-colors
                    duration-500
                    group-hover:text-[#FF5A1F]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-sm
                    md:text-base
                    leading-relaxed
                    text-[#0B0F19]
                  "
                >
                  {item.description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
