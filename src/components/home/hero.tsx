"use client";

import { ArrowRight, ArrowUpRight, CalendarClock, CircleCheck, Package, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

import { motion } from "framer-motion";

const stats = [
    {
        label: "Faturamento",
        value: "R$ 84.6K",
        change: "+12,4%",
        icon: TrendingUp,
    },
    {
        label: "Clientes",
        value: "2.480",
        change: "+8,2%",
        icon: Users,
    },
    {
        label: "Vencimentos",
        value: "12",
        change: "próximos",
        icon: CalendarClock,
    },
];

export default function Hero() {
    return (
        <section
            className="
                relative
                mx-6
                flex
                min-h-screen
                flex-col
                items-center
                justify-between
                gap-16
                overflow-hidden
                border-b
                border-border
                pt-32
                pb-16
                md:mx-10
                lg:mx-16
                lg:flex-row
            "
        >
            {/* Content */}
            <div className="relative z-10 flex max-w-3xl flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h1
                        className="
                            text-4xl
                            font-medium
                            leading-[1.2]
                            tracking-[0.01em]
                            text-foreground
                            md:text-5xl
                            lg:text-6xl
                        "
                    >
                        <span className="text-primary">Gestão inteligente</span> para empresas de extintores
                    </h1>

                    <p
                        className="
                            max-w-2xl
                            text-lg
                            leading-relaxed
                            text-foreground
                            md:text-xl
                        "
                    >
                        Controle vendas, vencimentos, clientes e ordens de serviço em uma única plataforma moderna para
                        empresas de manutenção e revenda de extintores.
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <Link
                        href="https://wa.me/5519996779283?text=Olá,%20quero%20agendar%20uma%20demonstração%20do%20IgnisCore"
                        target="_blank"
                        className="
                            group
                            flex
                            items-center
                            justify-center
                            gap-3
                            border
                            border-primary
                            bg-primary
                            px-6
                            py-4
                            font-semibold
                            text-primary-foreground
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:bg-primary/90
                            hover:shadow-[0_0_30px_rgba(255,90,31,0.25)]
                        "
                    >
                        Solicitar demonstração
                        <ArrowRight
                            width={18}
                            height={18}
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>

                    <Link
                        href="/#dashboard"
                        className="
                            group
                            flex
                            items-center
                            justify-center
                            gap-3
                            border
                            border-primary
                            bg-transparent
                            px-6
                            py-4
                            font-semibold
                            text-primary
                            transition-all
                            duration-300
                            hover:bg-primary
                            hover:text-primary-foreground
                        "
                    >
                        Ver plataforma
                        <ArrowRight
                            width={18}
                            height={18}
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                </div>
            </div>

            {/* Data panel */}
            <div className="relative flex w-full max-w-4xl justify-center">
                <div
                    className="
                        absolute
                        h-[80%]
                        w-[80%]
                        rounded-full
                        bg-primary/10
                        blur-3xl
                    "
                />

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 24,
                        scale: 0.98,
                    }}
                    animate={{
                        opacity: 1,
                        y: [0, -3, 0],
                        scale: 1,
                    }}
                    transition={{
                        opacity: {
                            duration: 0.7,
                        },
                        scale: {
                            duration: 0.7,
                        },
                        y: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    className="
        relative
        w-full
        max-w-2xl
        border
        border-border
        bg-background
        shadow-[0_25px_80px_rgba(0,0,0,0.12)]
    "
                >
                    {/* Panel header */}
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-border
                            px-5
                            py-4
                            md:px-6
                            md:py-5
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    border
                                    border-primary/20
                                    bg-primary/10
                                "
                            >
                                <TrendingUp size={18} className="text-primary" />
                            </div>

                            <div>
                                <p className="text-sm font-medium">Visão geral</p>

                                <p className="text-xs text-muted-foreground">Dados operacionais</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            Online
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 border-b border-border sm:grid-cols-3">
                        {stats.map(stat => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="
                                        border-b
                                        border-border
                                        p-5
                                        last:border-b-0
                                        sm:border-b-0
                                        sm:border-r
                                        sm:last:border-r-0
                                        md:p-6
                                    "
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">{stat.label}</span>

                                        <Icon size={16} className="text-muted-foreground" />
                                    </div>

                                    <div className="mt-3 flex items-end justify-between gap-3">
                                        <span className="text-2xl font-medium tracking-tight md:text-3xl">
                                            {stat.value}
                                        </span>

                                        <span className="text-xs text-primary">{stat.change}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Chart */}
                    <div className="p-5 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Desempenho</p>

                                <p className="mt-1 text-xs text-muted-foreground">Faturamento nos últimos meses</p>
                            </div>

                            <ArrowUpRight size={17} className="text-primary" />
                        </div>

                        <div className="mt-8 flex h-36 items-end gap-2 md:h-44 md:gap-3">
                            {[35, 48, 42, 58, 52, 68, 61, 75, 69, 84, 78, 96].map((height, index) => (
                                <div key={index} className="flex h-full flex-1 items-end">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{
                                            duration: 0.7,
                                            delay: index * 0.04,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className={`
        w-full
        ${index === 11 ? "bg-primary" : "bg-primary/15"}
    `}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 flex justify-between text-[10px] text-muted-foreground md:text-xs">
                            <span>JAN</span>
                            <span>MAR</span>
                            <span>MAI</span>
                            <span>JUL</span>
                            <span>SET</span>
                            <span>OUT</span>
                        </div>
                    </div>

                    {/* Bottom metrics */}
                    <div className="grid grid-cols-1 gap-3 border-t border-border p-5 sm:grid-cols-2 md:p-6">
                        <div className="flex items-center gap-3 border border-border p-4">
                            <CircleCheck size={17} className="text-primary" />

                            <div>
                                <p className="text-sm font-medium">342 vendas</p>

                                <p className="text-xs text-muted-foreground">Processadas no período</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 border border-border p-4">
                            <Package size={17} className="text-primary" />

                            <div>
                                <p className="text-sm font-medium">526 produtos</p>

                                <p className="text-xs text-muted-foreground">Em controle operacional</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
