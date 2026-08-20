"use client";

import {
  CalendarClock,
  ChartBarIncreasingIcon,
  ClipboardListIcon,
  UserX,
} from "lucide-react";

const challenges = [
  {
    title: "Controle manual de vencimentos",
    description:
      "Risco de atrasos, multas e perda de contratos por falta de automação.",
    icon: CalendarClock,
  },
  {
    title: "Perda de clientes recorrentes",
    description:
      "Falta de acompanhamento reduz retenção e recorrência de serviços.",
    icon: UserX,
  },
  {
    title: "Ordens de serviço desorganizadas",
    description:
      "Informações descentralizadas dificultam execução e acompanhamento.",
    icon: ClipboardListIcon,
  },
  {
    title: "Falta de indicadores em tempo real",
    description:
      "Decisões estratégicas ficam limitadas sem dados centralizados.",
    icon: ChartBarIncreasingIcon,
  },
];

export default function Challenges() {
  return (
    <section
      id="desafios"
      className="
        relative
        mx-6
        grid
        grid-cols-1
        gap-16
        py-24
        md:mx-10
        lg:mx-16
        lg:grid-cols-2
      "
    >
      {/* Content */}
      <div
        className="
          flex
          h-max
          flex-col
          gap-6
          self-start
          lg:sticky
          lg:top-32
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
          Desafios da operação
        </p>

        <h2
          className="
            text-3xl
            font-medium
            leading-[1.2]
            tracking-[0.01em]
            text-foreground
            md:text-5xl
          "
        >
          <span className="text-primary">Sua operação</span> ainda depende de
          planilhas e processos manuais?
        </h2>

        <p
          className="
            max-w-xl
            text-lg
            leading-relaxed
            text-foreground
            md:text-xl
          "
        >
          Processos descentralizados dificultam o controle da operação, aumentam
          falhas e impactam diretamente o crescimento da empresa.
        </p>
      </div>

      {/* Challenges */}
      <div className="flex flex-col gap-8">
        {challenges.map((challenge) => {
          const Icon = challenge.icon;

          return (
            <article
              key={challenge.title}
              className="
                group
                flex
                w-full
                items-center
                justify-between
                gap-6
                border
                border-border
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary
                hover:shadow-[0_0_30px_rgba(255,90,31,0.08)]
                md:p-8
              "
            >
              <div className="flex flex-col gap-3">
                <p
                  className="
                    text-lg
                    leading-normal
                    tracking-[0.02em]
                    text-foreground
                    transition-colors
                    duration-300
                    group-hover:text-primary
                    md:text-xl
                  "
                >
                  {challenge.title}
                </p>

                <span
                  className="
                    text-sm
                    leading-relaxed
                    text-muted-foreground
                  "
                >
                  {challenge.description}
                </span>
              </div>

              <Icon
                width={48}
                height={48}
                className="
                  min-w-12
                  text-primary
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
