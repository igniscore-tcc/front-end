"use client";

import {
  Building2,
  Package,
  BellRing,
  BarChart3,
  ArrowRight,
} from "lucide-react";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import { useRef, useState } from "react";

const steps = [
  {
    step: "01",
    title: "Cadastre sua empresa",
    description:
      "Configure sua operação, equipe técnica e informações iniciais em poucos minutos.",
    icon: Building2,
  },
  {
    step: "02",
    title: "Gerencie produtos",
    description:
      "Cadastre extintores, equipamentos e controle movimentações com precisão.",
    icon: Package,
  },
  {
    step: "03",
    title: "Automatize vencimentos",
    description:
      "Receba alertas automáticos para inspeções, recargas e serviços pendentes.",
    icon: BellRing,
  },
  {
    step: "04",
    title: "Acompanhe indicadores",
    description:
      "Visualize métricas operacionais e crescimento da empresa em tempo real.",
    icon: BarChart3,
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = steps.length;

    const current = Math.min(total - 1, Math.floor(latest * total));

    setActiveIndex(current);
  });

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      aria-labelledby="timeline-title"
      className="
        relative
        overflow-hidden
        px-6
        md:px-10
        lg:px-16
        py-24
      "
    >
      <div className="flex flex-col items-center text-center gap-6">
        <p
          className="
            text-sm
            uppercase
            tracking-[0.15em]
            text-[#FF5A1F]
            font-semibold
          "
        >
          Processo simples
        </p>

        <h2
          id="timeline-title"
          className="
            text-4xl
            md:text-5xl
            text-[#B1B4B8]
            font-medium
            leading-[1.2]
            max-w-4xl
          "
        >
          <span className="text-[#FF5A1F]">Comece</span> sua operação em poucos
          passos
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
          Estruture processos, automatize tarefas e acompanhe toda operação da
          sua empresa em uma única plataforma.
        </p>
      </div>

      <div
        className="
          relative
          mt-20
          md:mt-28
          flex
          flex-col
          gap-8
          md:gap-14
        "
      >
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          className="
            absolute
            top-0
            left-5
            md:left-1/2
            w-px
            h-full
            bg-[#B1B4B8]/20
            origin-top
            md:-translate-x-1/2
          "
        />

        {steps.map((item, index) => {
          const Icon = item.icon;

          const isLeft = index % 2 === 0;

          const isActive = activeIndex === index;

          return (
            <div
              key={item.step}
              className={`
                relative
                flex
                w-full
                ${isLeft ? "md:justify-start" : "md:justify-end"}
              `}
            >
              <motion.article
                initial={{
                  opacity: 0,
                  x: isLeft ? -120 : 120,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                animate={{
                  scale: isActive ? 1 : 0.97,
                  opacity: isActive ? 1 : 0.45,
                }}
                className={`
                  group
                  relative
                  ml-14
                  md:ml-0
                  w-full
                  md:w-[85%]
                  lg:w-[46%]
                  border
                  ${isActive ? "border-[#FF5A1F]/40" : "border-[#B1B4B8]/20"}
                  bg-white/80
                  backdrop-blur-xl
                  p-6
                  md:p-8
                  transition-all
                  duration-500
                  hover:border-[#FF5A1F]/40
                `}
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
                  className={`
                    absolute
                    top-10
                    h-px
                    w-10
                    bg-[#B1B4B8]/20
                    hidden
                    md:block
                    ${isLeft ? "right-[-40px]" : "left-[-40px]"}
                  `}
                />

                <div
                  className="
                    relative
                    z-10
                    flex
                    justify-between
                    gap-6
                  "
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`
                          flex
                          items-center
                          justify-center
                          w-12
                          h-12
                          md:w-14
                          md:h-14
                          border
                          transition-all
                          duration-500
                          ${
                            isActive
                              ? "border-[#FF5A1F]/30 bg-[#FF5A1F]/10"
                              : "border-[#B1B4B8]/20"
                          }
                        `}
                      >
                        <Icon
                          width={24}
                          height={24}
                          className={
                            isActive ? "text-[#FF5A1F]" : "text-[#B1B4B8]"
                          }
                        />
                      </div>

                      <h3
                        className={`
                          text-xl
                          md:text-2xl
                          font-medium
                          transition-all
                          duration-500

                          ${isActive ? "text-[#FF5A1F]" : "text-[#B1B4B8]"}
                        `}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <motion.div
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="overflow-hidden"
                    >
                      <p
                        className="
                          text-sm
                          md:text-base
                          text-[#0B0F19]
                          leading-relaxed
                          max-w-md
                        "
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  <div
                    className="
                      hidden
                      sm:flex
                      flex-col
                      items-end
                      gap-2
                    "
                  >
                    <span
                      className={`
                        text-4xl
                        md:text-5xl
                        font-medium
                        transition-all
                        duration-500
                        ${isActive ? "text-[#FF5A1F]/80" : "text-[#B1B4B8]/40"}
                      `}
                    >
                      {item.step}
                    </span>

                    <ArrowRight
                      width={20}
                      height={20}
                      className={`
                        transition-all
                        duration-500
                        ${
                          isActive
                            ? "text-[#FF5A1F] translate-x-1"
                            : "text-[#B1B4B8]"
                        }
                      `}
                    />
                  </div>
                </div>
              </motion.article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
