"use client";

import Image from "next/image";
import {
  Bell,
  TrendingUp,
  ShieldCheck,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

const floatingCards = [
  {
    title: "Vencimentos próximos",
    value: "12 Extintores",
    icon: Bell,
    position:
      "top-[8%] left-[-2%] md:left-[2%] animate-[float_6s_ease-in-out_infinite]",
  },
  {
    title: "Ordens concluídas",
    value: "+28%",
    icon: TrendingUp,
    position:
      "bottom-[14%] left-[0%] md:left-[4%] animate-[float_7s_ease-in-out_infinite]",
  },
  {
    title: "Inspeções ativas",
    value: "128 em andamento",
    icon: ShieldCheck,
    position:
      "top-[12%] right-[-2%] md:right-[2%] animate-[float_5.5s_ease-in-out_infinite]",
  },
  {
    title: "Tempo médio",
    value: "2.4 dias",
    icon: Clock3,
    position:
      "bottom-[10%] right-[0%] md:right-[4%] animate-[float_6.5s_ease-in-out_infinite]",
  },
];

export default function InteractionDashboard() {
  return (
    <section
      className="
    hidden
    lg:flex

    relative
    flex-col
    gap-16
    overflow-hidden

    mt-24
    px-6
    md:px-10
    lg:px-16
    py-24
  "
    >
      <div className="flex flex-col items-center gap-6 text-center relative z-10">
        <p
          className="
            text-sm
            uppercase
            tracking-[0.15em]
            text-[#FF5A1F]
            font-semibold
          "
        >
          Dashboard inteligente
        </p>

        <h2
          className="
            text-4xl
            md:text-5xl
            text-[#B1B4B8]
            font-medium
            leading-[1.2]
            tracking-[0.01em]
            max-w-4xl
          "
        >
          <span className="text-[#FF5A1F]">Visualize sua</span> operação em
          tempo real
        </h2>

        <p
          className="
            text-lg
            md:text-xl
            text-[#0B0F19]
            leading-relaxed
            max-w-3xl
          "
        >
          Acompanhe indicadores, vencimentos, produtividade e movimentações da
          empresa em uma experiência moderna e totalmente centralizada.
        </p>
      </div>

      <div
        className="
            relative
            hidden
            md:flex
            items-center
            justify-center
            w-full
            min-h-162.5
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
            group
            transition-transform
            duration-700
            hover:scale-[1.015]
          "
        >
          <div
            className="
              absolute
              inset-0
              rounded-[2rem]
              border
              border-[#FF5A1F]/20
              scale-[1.03]
              opacity-0
              transition-all
              duration-700
              group-hover:opacity-100
            "
          />

          <Image
            src="/dashboard.svg"
            alt="Dashboard da plataforma IgnisCore"
            width={1600}
            height={900}
            priority
            className="
              relative
              z-10
              w-full
              max-w-7xl
              object-contain
            "
          />

          {floatingCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                key={index}
                className={`
                  absolute
                  ${card.position}
                  z-20
                  hidden
                  md:flex
                  items-start
                  gap-4
                  min-w-65
                  border
                  border-[#B1B4B8]/30
                  bg-white/80
                  backdrop-blur-xl
                  px-5
                  py-4
                  shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                  transition-all
                  duration-500
                  hover:border-[#FF5A1F]
                  hover:-translate-y-1
                `}
              >
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    min-w-12
                    h-12
                    border
                    border-[#FF5A1F]/30
                    bg-[#FF5A1F]/10
                  "
                >
                  <Icon width={22} height={22} className="text-[#FF5A1F]" />
                </div>

                <div className="flex flex-col gap-1">
                  <p
                    className="
                      text-sm
                      text-[#B1B4B8]
                    "
                  >
                    {card.title}
                  </p>

                  <div className="flex items-center gap-2">
                    <h3
                      className="
                        text-lg
                        font-medium
                        text-[#0B0F19]
                      "
                    >
                      {card.value}
                    </h3>

                    <ArrowUpRight
                      width={16}
                      height={16}
                      className="text-[#FF5A1F]"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
