"use client";

import { CalendarClock, ChartBarIncreasingIcon, ClipboardListIcon, UserX } from "lucide-react";

import { useLocale } from "@/components/providers/locale-provider";

const icons = [CalendarClock, UserX, ClipboardListIcon, ChartBarIncreasingIcon];

export default function Challenges() {
    const { t } = useLocale();
    const content = t.challenges;

    const challenges = [
        {
            title: content.items.manualControl.title,
            description: content.items.manualControl.description,
            icon: icons[0],
        },
        {
            title: content.items.lostClients.title,
            description: content.items.lostClients.description,
            icon: icons[1],
        },
        {
            title: content.items.disorganizedOrders.title,
            description: content.items.disorganizedOrders.description,
            icon: icons[2],
        },
        {
            title: content.items.lackOfIndicators.title,
            description: content.items.lackOfIndicators.description,
            icon: icons[3],
        },
    ];

    return (
        <section
            id="desafios"
            className="
                relative mx-6 grid grid-cols-1 gap-16 py-24
                md:mx-10 lg:mx-16 lg:grid-cols-2
            "
        >
            {/* Content */}
            <div
                className="
                    flex h-max flex-col gap-6 self-start
                    lg:sticky lg:top-32
                "
            >
                <h2
                    className="
                        text-3xl font-medium leading-[1.2]
                        tracking-[0.01em] text-foreground
                        md:text-5xl
                    "
                >
                    <span className="text-primary">{content.titleHighlight}</span> {content.title}
                </h2>

                <p
                    className="
                        max-w-xl text-lg leading-relaxed
                        text-foreground md:text-xl
                    "
                >
                    {content.description}
                </p>
            </div>

            {/* Challenges */}
            <div className="flex flex-col gap-8">
                {challenges.map(challenge => {
                    const Icon = challenge.icon;

                    return (
                        <article
                            key={challenge.title}
                            className="
                                group flex w-full items-center
                                justify-between gap-6 border
                                border-border p-6 transition-all
                                duration-300 hover:-translate-y-1
                                hover:border-primary
                                hover:shadow-[0_0_30px_rgba(255,90,31,0.08)]
                                md:p-8
                            "
                        >
                            <div className="flex flex-col gap-3">
                                <p
                                    className="
                                        text-lg leading-normal
                                        tracking-[0.02em] text-foreground
                                        transition-colors duration-300
                                        group-hover:text-primary md:text-xl
                                    "
                                >
                                    {challenge.title}
                                </p>

                                <span
                                    className="
                                        text-sm leading-relaxed
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
                                    min-w-12 text-primary
                                    transition-transform duration-300
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
