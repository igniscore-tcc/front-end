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
        py-24
        md:px-10
        lg:px-16
      "
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <p
          className="
            text-sm
            font-semibold
            uppercase
            tracking-[0.15em]
            text-primary
          "
        >
          Público-alvo
        </p>

        <h2
          id="market-title"
          className="
            max-w-4xl
            text-4xl
            font-medium
            leading-[1.2]
            text-foreground
            md:text-5xl
          "
        >
          <span className="text-primary">Desenvolvido</span> para quem vive esse
          mercado
        </h2>

        <p
          className="
            max-w-3xl
            text-base
            leading-relaxed
            text-muted-foreground
            md:text-xl
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
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
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
              border-border
              bg-card
              p-6
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-primary/40
              md:p-8
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[radial-gradient(circle_at_top_left,rgba(255,90,31,0.08),transparent_70%)]
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
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
                  border-border
                  bg-muted
                "
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  priority={index === 0}
                  className="
                    h-64
                    w-full
                    object-contain
                    transition-transform
                    duration-700
                    group-hover:scale-105
                    md:h-72
                  "
                />
              </div>

              <div className="flex flex-col gap-4">
                <h3
                  className="
                    text-2xl
                    font-medium
                    text-foreground
                    transition-colors
                    duration-500
                    group-hover:text-primary
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-sm
                    leading-relaxed
                    text-muted-foreground
                    md:text-base
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
