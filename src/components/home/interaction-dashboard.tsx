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
        relative
        mt-24
        hidden
        flex-col
        gap-16
        overflow-hidden
        px-6
        py-24
        md:px-10
        lg:flex
        lg:px-16
      "
    >
      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          gap-6
          text-center
        "
      >
        <p
          className="
            text-sm
            font-semibold
            uppercase
            tracking-[0.15em]
            text-primary
          "
        >
          Dashboard inteligente
        </p>

        <h2
          className="
            max-w-4xl
            text-4xl
            font-medium
            leading-[1.2]
            tracking-[0.01em]
            text-foreground
            md:text-5xl
          "
        >
          <span className="text-primary">Visualize sua</span> operação em tempo
          real
        </h2>

        <p
          className="
            max-w-3xl
            text-lg
            leading-relaxed
            text-muted-foreground
            md:text-xl
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
          min-h-162.5
          w-full
          items-center
          justify-center
          md:flex
        "
      >
        {/* Glow */}
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
            group
            relative
            transition-transform
            duration-700
            hover:scale-[1.015]
          "
        >
          {/* Hover frame */}
          <div
            className="
              absolute
              inset-0
              scale-[1.03]
              rounded-[2rem]
              border
              border-primary/20
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

          {floatingCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className={`
                  absolute
                  ${card.position}
                  z-20
                  hidden
                  min-w-65
                  items-start
                  gap-4
                  border
                  border-border/60
                  bg-background/80
                  px-5
                  py-4
                  shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-primary
                  md:flex
                `}
              >
                <div
                  className="
                    flex
                    h-12
                    min-w-12
                    items-center
                    justify-center
                    border
                    border-primary/30
                    bg-primary/10
                  "
                >
                  <Icon width={22} height={22} className="text-primary" />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm text-muted-foreground">{card.title}</p>

                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-foreground">
                      {card.value}
                    </h3>

                    <ArrowUpRight
                      width={16}
                      height={16}
                      className="text-primary"
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
