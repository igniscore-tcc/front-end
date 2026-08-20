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
        mt-20
        flex
        flex-col
        gap-14
        px-6
        py-20
        lg:mt-24
        lg:gap-20
        lg:px-16
        lg:py-32
        md:px-10
      "
    >
      {/* Header */}
      <div className="flex flex-col gap-6">
        <p
          className="
            text-sm
            font-semibold
            uppercase
            tracking-[0.15em]
            text-primary
          "
        >
          Resultados reais
        </p>

        <h2
          className="
            max-w-3xl
            text-4xl
            font-medium
            leading-[1.2]
            text-foreground
            md:text-5xl
          "
        >
          <span className="text-primary">Resultados</span> que impactam sua
          operação
        </h2>

        <p
          className="
            max-w-2xl
            text-lg
            leading-relaxed
            text-muted-foreground
            md:text-xl
          "
        >
          O IgnisCore melhora produtividade, organização e controle operacional
          através de uma experiência moderna e centralizada.
        </p>
      </div>

      {/* Results */}
      <div
        className="
          grid
          grid-cols-1
          items-start
          gap-10
          lg:grid-cols-[460px_1fr]
          lg:gap-16
        "
      >
        {/* List */}
        <div className="flex flex-col">
          {results.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={item.title}
                animate={{
                  opacity: isActive ? 1 : 0.4,
                  scale: isActive ? 1 : 0.98,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="
                  relative
                  border-b
                  border-border/40
                  py-8
                "
              >
                {/* Active indicator */}
                <div
                  className={`
                    absolute
                    left-0
                    top-0
                    h-full
                    w-0.5
                    transition-all
                    duration-500
                    ${isActive ? "bg-primary" : "bg-transparent"}
                  `}
                />

                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div
                    className={`
                      border
                      p-3
                      transition-all
                      duration-500
                      ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border/40"
                      }
                    `}
                  >
                    <Icon
                      width={22}
                      height={22}
                      className={
                        isActive ? "text-primary" : "text-muted-foreground"
                      }
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <h3
                        className={`
                          text-2xl
                          font-medium
                          transition-all
                          duration-500
                          ${isActive ? "text-primary" : "text-muted-foreground"}
                        `}
                      >
                        {item.title}
                      </h3>

                      <ArrowUpRight
                        width={18}
                        height={18}
                        className={`
                          transition-all
                          duration-500
                          ${
                            isActive
                              ? "rotate-45 text-primary"
                              : "text-muted-foreground"
                          }
                        `}
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
                          max-w-md
                          leading-relaxed
                          text-muted-foreground
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

        {/* Dashboard */}
        <div
          className="
            relative
            hidden
            items-center
            justify-center
            lg:flex
          "
        >
          <div
            className="
              absolute
              h-[70%]
              w-[70%]
              rounded-full
              bg-primary/10
              blur-3xl
            "
          />

          <div
            className="
              relative
              flex
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
