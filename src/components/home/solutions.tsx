"use client";

import {
    CalendarClock,
    ChartBarIncreasingIcon,
    ClipboardListIcon,
    Package,
    ShoppingCartIcon,
    UsersIcon,
} from "lucide-react";

import { useLocale } from "@/components/providers/locale-provider";

const icons = [UsersIcon, Package, ShoppingCartIcon, ClipboardListIcon, CalendarClock, ChartBarIncreasingIcon];

const gridStyles = [
    "lg:border-l lg:border-b lg:border-r",
    "lg:border-b lg:border-r",
    "lg:border-b",
    "lg:border-l lg:border-r",
    "lg:border-r",
    "",
];

export default function Solutions() {
    const { t } = useLocale();
    const content = t.solutions;

    const solutions = [
        content.items.clients,
        content.items.products,
        content.items.sales,
        content.items.serviceOrders,
        content.items.expirations,
        content.items.dashboard,
    ];

    return (
        <section
            id="solucoes"
            className="
                mx-6 flex flex-col gap-16 py-24
                md:mx-10 lg:mx-16
            "
        >
            {/* Header */}
            <div className="flex flex-col items-center gap-6 text-center">
                <h2
                    className="
                        max-w-4xl text-4xl font-medium
                        leading-[1.2] tracking-[0.01em]
                        text-foreground md:text-5xl
                    "
                >
                    <span className="text-primary">{content.titleHighlight}</span> {content.title}
                </h2>

                <p
                    className="
                        max-w-3xl text-lg leading-relaxed
                        text-muted-foreground md:text-xl
                    "
                >
                    {content.description}
                </p>
            </div>

            {/* Solutions grid */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {solutions.map((item, index) => {
                    const Icon = icons[index];

                    return (
                        <article
                            key={item.title}
                            className={`
                                group relative flex flex-col gap-6
                                overflow-hidden border border-border
                                p-8 transition-all duration-500
                                hover:border-primary lg:border-0
                                ${gridStyles[index]}
                            `}
                        >
                            {/* Hover background */}
                            <div
                                className="
                                    pointer-events-none absolute inset-0
                                    bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_70%)]
                                    opacity-0 transition-opacity
                                    duration-500 group-hover:opacity-100
                                "
                            />

                            {/* Title */}
                            <div className="relative z-10 flex items-center gap-4">
                                <div
                                    className="
                                        border border-border p-3
                                        transition-all duration-500
                                        group-hover:border-primary
                                        group-hover:bg-primary/10
                                    "
                                >
                                    <Icon
                                        width={28}
                                        height={28}
                                        className="
                                            text-muted-foreground
                                            transition-colors duration-500
                                            group-hover:text-primary
                                        "
                                    />
                                </div>

                                <h3
                                    className="
                                        text-2xl font-medium text-foreground
                                        transition-colors duration-500
                                        group-hover:text-primary
                                    "
                                >
                                    {item.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p
                                className="
                                    relative z-10 leading-relaxed
                                    text-muted-foreground
                                    transition-colors duration-500
                                    group-hover:text-foreground
                                "
                            >
                                {item.description}
                            </p>

                            {/* Bottom accent */}
                            <div
                                className="
                                    absolute bottom-0 left-0 h-0.5 w-0
                                    bg-primary transition-all duration-500
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
