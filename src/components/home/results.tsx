"use client";

import { ArrowUpRight, CircleCheck, Clock3, Layers3, Package, ShieldCheck, TrendingUp, Users } from "lucide-react";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

const results = [
    {
        title: "Redução de atrasos",
        description: "Automatize notificações e acompanhe vencimentos em tempo real para evitar perdas operacionais.",
        icon: Clock3,
        metric: "94%",
        metricLabel: "vencimentos controlados",
        secondary: "12",
        secondaryLabel: "próximos vencimentos",
    },
    {
        title: "Mais produtividade",
        description: "Centralize processos, ordens de serviço e informações da equipe em uma única plataforma.",
        icon: TrendingUp,
        metric: "+38%",
        metricLabel: "mais produtividade",
        secondary: "126",
        secondaryLabel: "serviços realizados",
    },
    {
        title: "Melhor atendimento",
        description: "Tenha acesso rápido ao histórico completo dos clientes e agilize atendimentos técnicos.",
        icon: ShieldCheck,
        metric: "2.480",
        metricLabel: "clientes cadastrados",
        secondary: "98%",
        secondaryLabel: "atendimentos concluídos",
    },
    {
        title: "Gestão centralizada",
        description: "Visualize indicadores estratégicos, serviços e movimentações em tempo real.",
        icon: Layers3,
        metric: "R$ 84.6K",
        metricLabel: "faturamento no período",
        secondary: "342",
        secondaryLabel: "vendas realizadas",
    },
];

export default function Result() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 80%", "end 20%"],
    });

    useMotionValueEvent(scrollYProgress, "change", latest => {
        const total = results.length;
        const current = Math.min(total - 1, Math.floor(latest * total));

        setActiveIndex(current);
    });

    const activeResult = results[activeIndex];

    return (
        <section
            ref={sectionRef}
            id="resultados"
            className="
        relative
        flex
        flex-col
        gap-14
        px-6
        py-20
        lg:gap-20
        lg:px-16
        lg:py-32
        md:px-10
      "
        >
            {/* Header */}
            <div className="flex flex-col gap-6">
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
                    <span className="text-primary">Resultados</span> que impactam sua operação
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
                    O IgnisCore melhora produtividade, organização e controle operacional através de uma experiência
                    moderna e centralizada.
                </p>
            </div>

            {/* Results */}
            <div
                className="
          grid
          grid-cols-1
          items-center
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
                                className="relative border-b border-border/40 py-8"
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
                    ${isActive ? "bg-primary" : "bg-transparent"}
                  `}
                                />

                                <div className="flex items-start gap-5">
                                    <div
                                        className={`
                      border
                      p-3
                      transition-all
                      duration-500
                      ${isActive ? "border-primary bg-primary/10" : "border-border/40"}
                    `}
                                    >
                                        <Icon
                                            width={22}
                                            height={22}
                                            className={isActive ? "text-primary" : "text-muted-foreground"}
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
                          ${isActive ? "rotate-45 text-primary" : "text-muted-foreground"}
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
                                            <p className="max-w-md leading-relaxed text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Visual panel */}
                <div className="relative hidden min-h-[520px] items-center justify-center lg:flex">
                    <div className="absolute inset-0 bg-primary/[0.03]" />

                    <div className="relative w-full max-w-xl border border-border bg-background">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-border px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center border border-primary/20 bg-primary/10">
                                    <activeResult.icon size={18} className="text-primary" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium">Visão operacional</p>

                                    <p className="text-xs text-muted-foreground">Atualizado em tempo real</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                Online
                            </div>
                        </div>

                        {/* Main metric */}
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className="p-6"
                        >
                            <p className="text-sm text-muted-foreground">{activeResult.metricLabel}</p>

                            <div className="mt-2 flex items-end justify-between">
                                <span className="text-5xl font-medium tracking-tight">{activeResult.metric}</span>

                                <div className="flex items-center gap-1 text-sm text-primary">
                                    <TrendingUp size={15} />
                                    <span>+12,4%</span>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="mt-10 flex h-32 items-end gap-2">
                                {[35, 48, 42, 64, 55, 72, 68, 82, 76, 94, 88, 100].map((height, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.025,
                                        }}
                                        className={`flex-1 ${index === 11 ? "bg-primary" : "bg-primary/15"}`}
                                    />
                                ))}
                            </div>

                            {/* Secondary metrics */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="border border-border p-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <CircleCheck size={15} />
                                        <span className="text-xs">Indicador</span>
                                    </div>

                                    <p className="mt-3 text-2xl font-medium">{activeResult.secondary}</p>

                                    <p className="mt-1 text-xs text-muted-foreground">{activeResult.secondaryLabel}</p>
                                </div>

                                <div className="border border-border p-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Users size={15} />
                                        <span className="text-xs">Equipe</span>
                                    </div>

                                    <p className="mt-3 text-2xl font-medium">08</p>

                                    <p className="mt-1 text-xs text-muted-foreground">usuários ativos</p>
                                </div>
                            </div>

                            {/* Bottom */}
                            <div className="mt-4 flex items-center justify-between border border-border px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <Package size={15} className="text-muted-foreground" />

                                    <span className="text-xs text-muted-foreground">Dados sincronizados</span>
                                </div>

                                <span className="text-xs text-primary">Agora</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
