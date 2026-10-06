"use client";

import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

const plans = [
    {
        id: "starter",
        name: "Starter",
        description: "Para operações que estão começando a organizar sua gestão.",
        price: "99",
        features: [
            "Até 500 clientes",
            "Até 500 produtos",
            "Até 2 usuários",
            "Vendas e vencimentos",
            "Dashboard",
            "Relatórios básicos",
            "Suporte padrão",
        ],
    },
    {
        id: "business",
        name: "Business",
        description: "Para empresas que precisam de mais controle e produtividade.",
        price: "199",
        popular: true,
        features: [
            "Até 2.000 clientes",
            "Até 2.000 produtos",
            "Até 5 usuários",
            "Vendas e vencimentos",
            "Dashboard",
            "Relatórios avançados",
            "Gestão de funcionários",
            "Suporte prioritário",
            "Recursos avançados",
        ],
    },
    {
        id: "professional",
        name: "Professional",
        description: "Para operações maiores que precisam de controle completo.",
        price: "369",
        features: [
            "Clientes ilimitados",
            "Produtos ilimitados",
            "Usuários ilimitados",
            "Vendas e vencimentos",
            "Dashboard",
            "Relatórios avançados",
            "Gestão de funcionários",
            "Suporte dedicado",
            "Recursos avançados",
            "Personalização",
        ],
    },
];

export default function PlansPage() {
    const [selectedPlan, setSelectedPlan] = useState("business");
    const [loading, setLoading] = useState(false);

    const activePlan = plans.find(plan => plan.id === selectedPlan)!;

    const handleContinue = async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    plan: selectedPlan,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao iniciar pagamento");
            }

            window.location.href = data.url;
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <main className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
            {/* Plans */}
            <section className="flex items-center justify-center px-6 py-12 md:px-10 lg:px-16">
                <div className="w-full max-w-xl">
                    <div className="mb-8"></div>

                    <div className="flex flex-col gap-3">
                        {plans.map(plan => {
                            const selected = selectedPlan === plan.id;

                            return (
                                <button
                                    key={plan.id}
                                    type="button"
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`relative w-full border p-5 text-left transition-all ${
                                        selected
                                            ? "border-primary bg-primary/[0.03]"
                                            : "border-border hover:border-primary/40"
                                    }`}
                                >
                                    {/* Popular */}
                                    <div className="absolute right-5 top-5 h-4">
                                        {plan.popular && (
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                                                Mais escolhido
                                            </span>
                                        )}
                                    </div>

                                    {/* Main */}
                                    <div className="flex min-h-[76px] items-start justify-between gap-6 pr-28">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                                        selected ? "border-primary" : "border-muted-foreground/40"
                                                    }`}
                                                >
                                                    {selected && <div className="h-2 w-2 rounded-full bg-primary" />}
                                                </div>

                                                <h2 className="text-lg font-medium">{plan.name}</h2>
                                            </div>

                                            <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
                                                {plan.description}
                                            </p>
                                        </div>

                                        <div className="shrink-0 text-right">
                                            <p className="text-2xl font-medium">R$ {plan.price}</p>

                                            <p className="text-xs text-muted-foreground">/mês</p>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div
                                        className={`grid transition-all duration-300 ${
                                            selected ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border/60 pt-4">
                                                {plan.features.slice(0, 4).map(feature => (
                                                    <div key={feature} className="flex items-center gap-2">
                                                        <CheckCircle2 size={13} className="shrink-0 text-primary" />

                                                        <span className="text-xs text-muted-foreground">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleContinue}
                            className="group flex w-full items-center justify-center gap-3 bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Preparando pagamento..." : `Começar com o ${activePlan.name}`}

                            {!loading && (
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            )}
                        </button>

                        <p className="mt-3 text-center text-xs text-muted-foreground">
                            14 dias grátis · sem cobrança durante o período de teste
                        </p>
                    </div>
                </div>
            </section>

            {/* Conversion panel */}
            <section className="relative hidden overflow-hidden border-l border-border bg-muted/20 lg:flex">
                <div className="absolute inset-0 bg-primary/[0.025]" />

                <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">
                    <div>
                        <h2 className="mt-6 max-w-xl text-4xl font-medium leading-[1.15] tracking-tight xl:text-5xl">
                            Comece agora.
                            <br />
                            Pague depois.
                        </h2>

                        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                            Seu período de teste começa assim que sua assinatura for configurada. Tenha acesso à
                            plataforma completa durante 14 dias.
                        </p>

                        <div className="mt-10 flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="shrink-0 text-primary" />

                                <span className="text-sm">14 dias de acesso completo</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="shrink-0 text-primary" />

                                <span className="text-sm">Cancele quando quiser</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="shrink-0 text-primary" />

                                <span className="text-sm">Ambiente exclusivo para sua empresa</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="shrink-0 text-primary" />

                                <span className="text-sm">Pagamento seguro via Stripe</span>
                            </div>
                        </div>
                    </div>

                    {/* Selected plan card */}
                    <div className="relative mt-16 max-w-xl border border-border bg-background">
                        <div className="border-b border-border px-6 py-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Plano selecionado</p>

                                    <p className="mt-1 text-xs text-muted-foreground">{activePlan.description}</p>
                                </div>

                                <div className="flex h-9 w-9 items-center justify-center border border-primary/20 bg-primary/10">
                                    <ShieldCheck size={18} className="text-primary" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div className="border-r border-border p-6">
                                <p className="text-xs text-muted-foreground">Plano</p>

                                <p className="mt-2 text-3xl font-medium">{activePlan.name}</p>

                                <p className="mt-2 text-xs text-muted-foreground">selecionado</p>
                            </div>

                            <div className="p-6">
                                <p className="text-xs text-muted-foreground">Teste</p>

                                <p className="mt-2 text-3xl font-medium">14 dias</p>

                                <p className="mt-2 text-xs text-muted-foreground">totalmente grátis</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-border px-6 py-4">
                            <div className="flex items-center gap-2">
                                <Sparkles size={15} className="text-primary" />

                                <span className="text-xs text-muted-foreground">Tudo pronto para começar</span>
                            </div>

                            <span className="text-sm font-medium">R$ {activePlan.price}/mês</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
