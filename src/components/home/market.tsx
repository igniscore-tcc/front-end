
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "@/components/providers/locale-provider";

export default function Market() {
    const { t } = useLocale();
    const content = t.market;

    const markets = [
        {
            title: content.items.extinguisherResellers.title,
            description: content.items.extinguisherResellers.description,
            image: "/payments.svg",
        },
        {
            title: content.items.maintenanceCompanies.title,
            description: content.items.maintenanceCompanies.description,
            image: "/contract.svg",
        },
        {
            title: content.items.serviceProviders.title,
            description: content.items.serviceProviders.description,
            image: "/brief.svg",
        },
    ];

    return (
        <section
            id="mercado"
            aria-labelledby="market-title"
            className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        >
            <div className="flex flex-col items-center gap-6 text-center">
                <h2
                    id="market-title"
                    className="max-w-4xl text-4xl font-medium leading-[1.2] text-foreground md:text-5xl"
                >
                    <span className="text-primary">
                        {content.titleHighlight}
                    </span>{" "}
                    {content.title}
                </h2>

                <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-xl">
                    {content.description}
                </p>
            </div>

            <div className="relative mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {markets.map((item, index) => (
                    <motion.article
                        key={item.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.15,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                        className="group relative overflow-hidden border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 md:p-8"
                    >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative z-10 flex flex-col gap-10">
                            <div className="overflow-hidden rounded-2xl border border-border bg-muted">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={800}
                                    height={600}
                                    priority={index === 0}
                                    className="h-64 w-full object-contain transition-transform duration-700 group-hover:scale-105 md:h-72"
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="text-2xl font-medium text-foreground transition-colors duration-500 group-hover:text-primary">
                                    {item.title}
                                </h3>

                                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
