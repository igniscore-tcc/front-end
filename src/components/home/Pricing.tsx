import { Button } from "@/components/ui/button";

const plans = [
    {
        name: "Starter",
        label: "Inicial",
        description: "Para pequenas operações que querem começar a se organizar.",
        price: "99",
        features: [
            "Até 500 clientes",
            "Até 500 produtos",
            "Até 2 usuários",
            "Gestão de vendas",
            "Controle de vencimentos",
            "Dashboard",
            "Relatórios básicos",
            "Gestão de funcionários",
            "Suporte padrão",
        ],
    },
    {
        name: "Business",
        label: "Crescimento",
        description: "Para empresas em crescimento que precisam de mais capacidade e recursos.",
        price: "199",
        popular: true,
        features: [
            "Até 2.000 clientes",
            "Até 2.000 produtos",
            "Até 5 usuários",
            "Gestão de vendas",
            "Controle de vencimentos",
            "Dashboard",
            "Relatórios avançados",
            "Gestão de funcionários",
            "Suporte prioritário",
            "Recursos avançados",
        ],
    },
    {
        name: "Professional",
        label: "Completo",
        description: "Para operações maiores que precisam de máxima flexibilidade e controle.",
        price: "369",
        features: [
            "Clientes ilimitados",
            "Produtos ilimitados",
            "Usuários ilimitados",
            "Gestão de vendas",
            "Controle de vencimentos",
            "Dashboard",
            "Relatórios avançados",
            "Gestão de funcionários",
            "Suporte dedicado",
            "Recursos avançados",
            "Personalização",
        ],
    },
];

export function Pricing() {
    return (
        <section className="px-6 pt-24 lg:px-16 lg:pt-32">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <article className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary">
                            Planos e preços
                        </div>

                        <h2 className="text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                            Escolha o plano ideal para <span className="text-primary">sua operação</span>
                        </h2>

                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                            Comece com 14 dias grátis e tenha tudo o que precisa para administrar sua empresa de forma
                            simples e eficiente.
                        </p>
                    </article>

                    <div className="flex shrink-0 items-center border border-border p-1">
                        <Button variant="secondary" className="rounded-none px-5">
                            Mensal
                        </Button>

                        <Button variant="ghost" className="rounded-none px-5 text-muted-foreground">
                            Anual
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
                                    Mais escolhido
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
                                    <span className="text-sm text-muted-foreground">R$</span>

                                    <span className="text-5xl font-medium tracking-tight">{plan.price}</span>

                                    <span className="mb-1 text-sm text-muted-foreground">/mês</span>
                                </div>

                                <p className="mt-2 text-sm text-primary">14 dias grátis</p>
                            </div>

                            <div className="mt-7 flex-1">
                                <p className="mb-4 text-sm font-medium">
                                    {plan.name === "Starter"
                                        ? "Inclui:"
                                        : `Tudo do ${plan.name === "Business" ? "Starter" : "Business"}, mais:`}
                                </p>

                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    {plan.features.map(feature => (
                                        <li key={feature}>✓ {feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                asChild
                                variant={plan.popular ? "default" : "outline"}
                                className="mt-8 h-12 w-full rounded-none"
                            >
                                <a href="/register">Começar agora</a>
                            </Button>
                        </article>
                    ))}
                </div>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                    Todos os planos incluem 14 dias grátis. Sem compromisso.
                </p>
            </div>
        </section>
    );
}
