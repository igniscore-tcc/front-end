"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Clock3,
  TrendingUp,
  ShieldCheck,
  Layers3,
} from "lucide-react";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import { useRef, useState } from "react";

const results = [
  {
    title: "Redução de atrasos",
    description:
      "Automatize notificações e acompanhe vencimentos em tempo real para evitar perdas operacionais.",
    image: "/dashboard.svg",
    icon: Clock3,
  },
  {
    title: "Mais produtividade",
    description:
      "Centralize processos, ordens de serviço e informações da equipe em uma única plataforma.",
    image: "/dashboard.svg",
    icon: TrendingUp,
  },
  {
    title: "Melhor atendimento",
    description:
      "Tenha acesso rápido ao histórico completo dos clientes e agilize atendimentos técnicos.",
    image: "/dashboard.svg",
    icon: ShieldCheck,
  },
  {
    title: "Gestão centralizada",
    description:
      "Visualize indicadores estratégicos, serviços e movimentações em tempo real.",
    image: "/dashboard.svg",
    icon: Layers3,
  },
];

export default function Result() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = results.length;

    const current = Math.min(total - 1, Math.floor(latest * total));

    setActiveIndex(current);
  });

  return (
    <section
      ref={sectionRef}
      id="resultados"
      className="
    relative
    flex
    flex-col
    gap-14
    lg:gap-20

    mt-20
    lg:mt-24

    px-6
    md:px-10
    lg:px-16

    py-20
    lg:py-32
  "
    >
      <div className="flex flex-col gap-6">
        <p
          className="
            text-sm
            uppercase
            tracking-[0.15em]
            text-[#FF5A1F]
            font-semibold
          "
        >
          Resultados reais
        </p>

        <h2
          className="
            text-4xl
            md:text-5xl
            text-[#B1B4B8]
            font-medium
            leading-[1.2]
            max-w-3xl
          "
        >
          <span className="text-[#FF5A1F]">Resultados</span> que impactam sua
          operação
        </h2>

        <p
          className="
            text-lg
            md:text-xl
            text-[#0B0F19]
            leading-relaxed
            max-w-2xl
          "
        >
          O IgnisCore melhora produtividade, organização e controle operacional
          através de uma experiência moderna e centralizada.
        </p>
      </div>

      <div
        className="
    grid
    grid-cols-1
    lg:grid-cols-[460px_1fr]

    gap-10
    lg:gap-16

    items-start
  "
      >
        <div className="flex flex-col">
          {results.map((item, index) => {
            const Icon = item.icon;

            const isActive = activeIndex === index;

            return (
              <motion.div
                key={index}
                animate={{
                  opacity: isActive ? 1 : 0.4,
                  scale: isActive ? 1 : 0.98,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="
                  relative
                  py-8
                  border-b
                  border-[#B1B4B8]/20
                "
              >
                <div
                  className={`
                    absolute
                    left-0
                    top-0

                    h-full
                    w-0.5

                    transition-all
                    duration-500

                    ${isActive ? "bg-[#FF5A1F]" : "bg-transparent"}
                  `}
                />

                <div className="flex items-start gap-5">
                  <div
                    className={`
                      p-3
                      border
                      transition-all
                      duration-500

                      ${
                        isActive
                          ? "border-[#FF5A1F] bg-[#FF5A1F]/10"
                          : "border-[#B1B4B8]/20"
                      }
                    `}
                  >
                    <Icon
                      width={22}
                      height={22}
                      className={isActive ? "text-[#FF5A1F]" : "text-[#B1B4B8]"}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <h3
                        className={`
                          text-2xl
                          font-medium
                          transition-all
                          duration-500

                          ${isActive ? "text-[#FF5A1F]" : "text-[#B1B4B8]"}
                        `}
                      >
                        {item.title}
                      </h3>

                      <ArrowUpRight
                        width={18}
                        height={18}
                        className={
                          isActive
                            ? "text-[#FF5A1F] rotate-45"
                            : "text-[#B1B4B8]"
                        }
                      />
                    </div>

                    <motion.div
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.45,
                      }}
                      className="overflow-hidden"
                    >
                      <p
                        className="
                          text-[#0B0F19]
                          leading-relaxed
                          max-w-md
                        "
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div
          className="
            relative
            hidden
            lg:flex
            items-center
            justify-center
          "
        >
          <div
            className="
              absolute
              w-[70%]
              h-[70%]
              bg-[#FF5A1F]/10
              blur-3xl
              rounded-full
            "
          />

          <div
            className="
    relative

    hidden lg:flex

    items-center
    justify-center
  "
          >
            <Image
              src={results[activeIndex].image}
              alt={results[activeIndex].title}
              width={1400}
              height={900}
              className="
      w-full
      max-w-5xl
      object-contain

      drop-shadow-[0_25px_80px_rgba(0,0,0,0.22)]
    "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
