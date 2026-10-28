"use client";

import { ArrowRight, BarChart3, BellRing, Building2, Package } from "lucide-react";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { useLocale } from "@/components/providers/locale-provider";
import { useRef, useState } from "react";

const icons = [Building2, Package, BellRing, BarChart3];

export default function Timeline() {
    const { t } = useLocale();
    const content = t.timeline;

    const steps = [
        { ...content.steps.company, icon: icons[0], step: "01" },
        { ...content.steps.products, icon: icons[1], step: "02" },
        { ...content.steps.expirations, icon: icons[2], step: "03" },
        { ...content.steps.indicators, icon: icons[3], step: "04" },
    ];

    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"],
    });

    useMotionValueEvent(scrollYProgress, "change", latest => {
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
                relative overflow-hidden px-6 py-24
                md:px-10 lg:px-16
            "
        >
            {/* Header */}
            <div className="flex flex-col items-center gap-6 text-center">
                <h2
                    id="timeline-title"
                    className="
                        max-w-4xl text-4xl font-medium
                        leading-[1.2] text-foreground md:text-5xl
                    "
                >
                    <span className="text-primary">{content.titleHighlight}</span> {content.title}
                </h2>

                <p
                    className="
                        max-w-3xl text-base leading-relaxed
                        text-muted-foreground md:text-xl
                    "
                >
                    {content.description}
                </p>
            </div>

            {/* Timeline */}
            <div
                className="
                    relative mt-20 flex flex-col gap-8
                    md:mt-28 md:gap-14
                "
            >
                {/* Timeline line */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                    }}
                    viewport={{ once: true }}
                    className="
                        absolute left-5 top-0 h-full w-px
                        origin-top bg-border/50
                        md:left-1/2 md:-translate-x-1/2
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
                                relative flex w-full
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
                                    group relative ml-14 w-full border
                                    bg-background/80 p-6 backdrop-blur-xl
                                    transition-all duration-500
                                    hover:border-primary/40
                                    md:ml-0 md:w-[85%] md:p-8 lg:w-[46%]
                                    ${isActive ? "border-primary/40" : "border-border/40"}
                                `}
                            >
                                {/* Hover glow */}
                                <div
                                    className="
                                        pointer-events-none absolute inset-0
                                        bg-[radial-gradient(circle_at_top_left,rgba(255,90,31,0.08),transparent_70%)]
                                        opacity-0 transition-opacity
                                        duration-500 group-hover:opacity-100
                                    "
                                />

                                {/* Connector */}
                                <div
                                    className={`
                                        absolute top-10 hidden h-px w-10
                                        bg-border/50 md:block
                                        ${isLeft ? "right-[-40px]" : "left-[-40px]"}
                                    `}
                                />

                                <div className="relative z-10 flex justify-between gap-6">
                                    <div className="flex flex-col gap-5">
                                        <div className="flex items-center gap-4">
                                            {/* Icon */}
                                            <div
                                                className={`
                                                    flex h-12 w-12 items-center
                                                    justify-center border
                                                    transition-all duration-500
                                                    md:h-14 md:w-14
                                                    ${isActive ? "border-primary/30 bg-primary/10" : "border-border/40"}
                                                `}
                                            >
                                                <Icon
                                                    width={24}
                                                    height={24}
                                                    className={isActive ? "text-primary" : "text-muted-foreground"}
                                                />
                                            </div>

                                            {/* Title */}
                                            <h3
                                                className={`
                                                    text-xl font-medium
                                                    transition-all duration-500
                                                    md:text-2xl
                                                    ${isActive ? "text-primary" : "text-muted-foreground"}
                                                `}
                                            >
                                                {item.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <motion.div
                                            animate={{
                                                height: isActive ? "auto" : 0,
                                                opacity: isActive ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.4 }}
                                            className="overflow-hidden"
                                        >
                                            <p
                                                className="
                                                    max-w-md text-sm
                                                    leading-relaxed
                                                    text-muted-foreground
                                                    md:text-base
                                                "
                                            >
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Step number */}
                                    <div className="hidden flex-col items-end gap-2 sm:flex">
                                        <span
                                            className={`
                                                text-4xl font-medium
                                                transition-all duration-500
                                                md:text-5xl
                                                ${isActive ? "text-primary/80" : "text-muted-foreground/40"}
                                            `}
                                        >
                                            {item.step}
                                        </span>

                                        <ArrowRight
                                            width={20}
                                            height={20}
                                            className={`
                                                transition-all duration-500
                                                ${isActive ? "translate-x-1 text-primary" : "text-muted-foreground"}
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
