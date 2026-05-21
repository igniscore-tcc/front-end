"use client";

import {
  CalendarClock,
  ChartBarIncreasingIcon,
  ClipboardListIcon,
  UserX,
} from "lucide-react";

export default function Challenges() {
  return (
    <section
      id="desafios"
      className="
        relative
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-16
        mx-6
        md:mx-10
        lg:mx-16
        py-24
      "
    >
      <div
        className="
          lg:sticky
          lg:top-32
          h-max
          flex
          flex-col
          gap-6
          self-start
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
          Desafios da operação
        </p>

        <h2
          className="
            text-3xl
            md:text-5xl
            text-cen
            text-[#B1B4B8]
            font-medium
            leading-[1.2]
            tracking-[0.01em]
          "
        >
          <span className="text-[#FF5A1F]">Sua operação</span> ainda depende de
          planilhas e processos manuais?
        </h2>

        <p
          className="
            text-lg
            md:text-xl
            text-[#0B0F19]
            leading-relaxed
            max-w-xl
          "
        >
          Processos descentralizados dificultam o controle da operação, aumentam
          falhas e impactam diretamente o crescimento da empresa.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <article
          className="
            group
            w-full
            border
            border-[#B1B4B8]
            p-6
            md:p-8
            flex
            justify-between
            items-center
            gap-6
            transition-all
            duration-300
            hover:border-[#FF5A1F]
            hover:-translate-y-1
            hover:shadow-[0_0_30px_rgba(255,90,31,0.08)]
          "
        >
          <div className="flex flex-col gap-3">
            <p
              className="
                text-lg
                md:text-xl
                text-[#0B0F19]
                leading-normal
                tracking-[0.02em]
                transition-colors
                duration-300
                group-hover:text-[#FF5A1F]
              "
            >
              Controle manual de vencimentos
            </p>

            <span className="text-sm text-[#B1B4B8] leading-relaxed">
              Risco de atrasos, multas e perda de contratos por falta de
              automação.
            </span>
          </div>

          <CalendarClock
            width={48}
            height={48}
            className="
              text-[#FF5A1F]
              min-w-12
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />
        </article>

        <article
          className="
            group
            w-full
            border
            border-[#B1B4B8]
            p-6
            md:p-8
            flex
            justify-between
            items-center
            gap-6
            transition-all
            duration-300
            hover:border-[#FF5A1F]
            hover:-translate-y-1
            hover:shadow-[0_0_30px_rgba(255,90,31,0.08)]
          "
        >
          <div className="flex flex-col gap-3">
            <p
              className="
                text-lg
                md:text-xl
                text-[#0B0F19]
                leading-normal
                tracking-[0.02em]
                transition-colors
                duration-300
                group-hover:text-[#FF5A1F]
              "
            >
              Perda de clientes recorrentes
            </p>

            <span className="text-sm text-[#B1B4B8] leading-relaxed">
              Falta de acompanhamento reduz retenção e recorrência de serviços.
            </span>
          </div>

          <UserX
            width={48}
            height={48}
            className="
              text-[#FF5A1F]
              min-w-12
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />
        </article>

        <article
          className="
            group
            w-full
            border
            border-[#B1B4B8]
            p-6
            md:p-8
            flex
            justify-between
            items-center
            gap-6
            transition-all
            duration-300
            hover:border-[#FF5A1F]
            hover:-translate-y-1
            hover:shadow-[0_0_30px_rgba(255,90,31,0.08)]
          "
        >
          <div className="flex flex-col gap-3">
            <p
              className="
                text-lg
                md:text-xl
                text-[#0B0F19]
                leading-normal
                tracking-[0.02em]
                transition-colors
                duration-300
                group-hover:text-[#FF5A1F]
              "
            >
              Ordens de serviço desorganizadas
            </p>

            <span className="text-sm text-[#B1B4B8] leading-relaxed">
              Informações descentralizadas dificultam execução e acompanhamento.
            </span>
          </div>

          <ClipboardListIcon
            width={48}
            height={48}
            className="
              text-[#FF5A1F]
              min-w-12
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />
        </article>

        <article
          className="
            group
            w-full
            border
            border-[#B1B4B8]
            p-6
            md:p-8
            flex
            justify-between
            items-center
            gap-6
            transition-all
            duration-300
            hover:border-[#FF5A1F]
            hover:-translate-y-1
            hover:shadow-[0_0_30px_rgba(255,90,31,0.08)]
          "
        >
          <div className="flex flex-col gap-3">
            <p
              className="
                text-lg
                md:text-xl
                text-[#0B0F19]
                leading-normal
                tracking-[0.02em]
                transition-colors
                duration-300
                group-hover:text-[#FF5A1F]
              "
            >
              Falta de indicadores em tempo real
            </p>

            <span className="text-sm text-[#B1B4B8] leading-relaxed">
              Decisões estratégicas ficam limitadas sem dados centralizados.
            </span>
          </div>

          <ChartBarIncreasingIcon
            width={48}
            height={48}
            className="
              text-[#FF5A1F]
              min-w-12
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />
        </article>
      </div>
    </section>
  );
}
