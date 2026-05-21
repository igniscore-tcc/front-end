import {
  CalendarClock,
  ChartBarIncreasingIcon,
  ClipboardListIcon,
  Package,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";

const solutions = [
  {
    title: "Gestão de Clientes",
    description:
      "Centralize históricos, contatos, contratos e acompanhe clientes recorrentes.",
    icon: UsersIcon,
  },
  {
    title: "Controle de Produtos",
    description:
      "Gerencie extintores, equipamentos, estoque e movimentações em tempo real.",
    icon: Package,
  },
  {
    title: "Vendas Inteligentes",
    description:
      "Organize propostas, negociações e acompanhe todo o fluxo comercial.",
    icon: ShoppingCartIcon,
  },
  {
    title: "Ordens de Serviço",
    description:
      "Controle atendimentos técnicos, manutenção e execução de serviços.",
    icon: ClipboardListIcon,
  },
  {
    title: "Controle de Vencimentos",
    description:
      "Automatize notificações e acompanhe vencimentos sem depender de planilhas.",
    icon: CalendarClock,
  },
  {
    title: "Dashboard Gerencial",
    description: "Visualize indicadores estratégicos da empresa em tempo real.",
    icon: ChartBarIncreasingIcon,
  },
];

const gridStyles = [
  "lg:border-l lg:border-b lg:border-r",
  "lg:border-b lg:border-r",
  "lg:border-b",

  "lg:border-l lg:border-r",
  "lg:border-r",
  "",
];

export default function Solutions() {
  return (
    <section
      id="solucoes"
      className="
        flex
        flex-col
        gap-16
        mx-6
        md:mx-10
        lg:mx-16
        py-24
      "
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <p
          className="
            text-sm
            uppercase
            tracking-[0.15em]
            text-[#FF5A1F]
            font-semibold
          "
        >
          Soluções completas
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
          <span className="text-[#FF5A1F]">Gerencie toda</span> a operação da
          sua empresa em uma única plataforma
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
          O IgnisCore conecta vendas, clientes, serviços e indicadores em uma
          experiência moderna, organizada e centralizada.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16">
        {solutions.map((item, index) => {
          const Icon = item.icon;

          return (
            <article
              key={index}
              className={`
          group
          relative
          overflow-hidden
          border
          lg:border-0
          border-[#B1B4B8]
          ${gridStyles[index]}
          p-8
          flex
          flex-col
          gap-6
          transition-all
          duration-500
          hover:border-[#FF5A1F]
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
            bg-[radial-gradient(circle_at_top_left,rgba(255,90,31,0.12),transparent_70%)]
            pointer-events-none
          "
              />

              <div className="relative z-10 flex gap-4 items-center">
                <div
                  className="
              p-3
              border
              border-[#B1B4B8]
              transition-all
              duration-500
              group-hover:border-[#FF5A1F]
              group-hover:bg-[#FF5A1F]/10
            "
                >
                  <Icon
                    width={28}
                    height={28}
                    className="
                text-[#B1B4B8]
                transition-colors
                duration-500
                group-hover:text-[#FF5A1F]
              "
                  />
                </div>

                <h3
                  className="
              text-2xl
              text-[#B1B4B8]
              font-medium
              transition-colors
              duration-500
              group-hover:text-[#FF5A1F]
            "
                >
                  {item.title}
                </h3>
              </div>

              <p
                className="
            relative
            z-10
            text-[#0B0F19]
            leading-relaxed
            transition-colors
            duration-500
            group-hover:text-[#B1B4B8]
          "
              >
                {item.description}
              </p>

              <div
                className="
            absolute
            bottom-0
            left-0
            h-0.5
            w-0
            bg-[#FF5A1F]
            transition-all
            duration-500
            group-hover:w-full
          "
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
