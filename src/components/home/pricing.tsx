"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";

export function Pricing() {
    const { t } = useLocale();
    const content = t.pricing;

    const plans = [
        {
            name: "Starter",
            label: content.plans.starter.label,
            description: content.plans.starter.description,
            price: content.plans.starter.price,
            features: content.plans.starter.features,
        },
        {
            name: "Business",
            label: content.plans.business.label,
            description: content.plans.business.description,
            price: content.plans.starter.price,
            popular: true,
            features: content.plans.business.features,
        },
        {
            name: "Professional",
            label: content.plans.professional.label,
            description: content.plans.professional.description,
            price: content.plans.starter.price,
            features: content.plans.professional.features,
        },
    ];

    return (
        <section className="px-6 pt-24 lg:px-16 lg:pt-32">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <article className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary">
                            {content.eyebrow}
                        </div>

                        <h2 className="text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                            {content.title} <span className="text-primary">{content.titleHighlight}</span>
                        </h2>

                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                            {content.description}
                        </p>
                    </article>

                    <div className="flex shrink-0 items-center border border-border p-1">
                        <Button variant="secondary" className="rounded-none px-5">
                            {content.monthly}
                        </Button>

                        <Button variant="ghost" className="rounded-none px-5 text-muted-foreground">
                            {content.annual}
                        </Button>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
                    {plans.map(plan => (
                        <article
                            key={plan.name}
                            className={`relative flex flex-col p-7 ${
                                plan.popular
                                    ? "border-2 border-primary bg-primary/[0.03]"
                                    : "border border-border bg-background transition-colors hover:border-primary/50"
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-6 bg-primary px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-foreground">
                                    {content.popular}
                                </div>
                            )}

                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-medium">{plan.name}</h3>

                                    <span
                                        className={`text-xs uppercase tracking-wider ${
                                            plan.popular ? "text-primary" : "text-muted-foreground"
                                        }`}
                                    >
                                        {plan.label}
                                    </span>
                                </div>

                                <p className="mt-3 min-h-[48px] text-sm leading-relaxed text-muted-foreground">
                                    {plan.description}
                                </p>
                            </div>

                            <div
                                className={`mt-8 border-y py-6 ${plan.popular ? "border-primary/20" : "border-border"}`}
                            >
                                <div className="flex items-end gap-1">
                                    <span className="text-sm text-muted-foreground">{content.currency}</span>

                                    <span className="text-5xl font-medium tracking-tight">{plan.price}</span>

                                    <span className="mb-1 text-sm text-muted-foreground">{content.perMonth}</span>
                                </div>

                                <p className="mt-2 text-sm text-primary">{content.freeTrial}</p>
                            </div>

                            <div className="mt-7 flex-1">
                                <p className="mb-4 text-sm font-medium">
                                    {plan.name === "Starter"
                                        ? content.includes
                                        : content.includesMore.replace(
                                              "{plan}",
                                              plan.name === "Business" ? "Starter" : "Business",
                                          )}
                                </p>

                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    {plan.features.map((feature: string) => (
                                        <li key={feature}>✓ {feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                asChild
                                variant={plan.popular ? "default" : "outline"}
                                className="mt-8 h-12 w-full rounded-none"
                            >
                                <a href="/register">{content.cta}</a>
                            </Button>
                        </article>
                    ))}
                </div>

                <p className="mt-8 text-center text-sm text-muted-foreground">{content.footer}</p>
            </div>
        </section>
    );
}
