import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";

import CompanyForm from "@/components/auth/CompanyForm";

const benefits = [
    "Configure sua empresa em poucos minutos",
    "Ambiente exclusivo para sua operação",
    "Dados organizados e centralizados",
    "Pronto para começar a utilizar o IgnisCore",
];

export default function CompanyPage() {
    return (
        <main className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
            {/* Form */}
            <section className="flex items-center justify-center px-6 py-12 md:px-10 lg:px-16">
                <div className="w-full max-w-md">
                    <div className="mt-14">
                        <div className="mt-8">
                            <CompanyForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Conversion panel */}
            <section className="relative hidden overflow-hidden border-l border-border bg-muted/20 lg:flex">
                <div className="absolute inset-0 bg-primary/[0.025]" />

                <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">
                    <div>
                        <h2 className="mt-6 max-w-xl text-4xl font-medium leading-[1.15] tracking-tight xl:text-5xl">
                            Sua operação.
                            <br />
                            Em um só lugar.
                        </h2>

                        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                            Falta pouco para começar. Configure os dados da sua empresa e prepare seu ambiente de gestão
                            no IgnisCore.
                        </p>

                        <div className="mt-10 flex flex-col gap-5">
                            {benefits.map(benefit => (
                                <div key={benefit} className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="shrink-0 text-primary" />

                                    <span className="text-sm">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Setup card */}
                    <div className="relative mt-16 max-w-xl border border-border bg-background">
                        <div className="border-b border-border px-6 py-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Seu ambiente está quase pronto</p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Finalize esta etapa para acessar sua plataforma
                                    </p>
                                </div>

                                <div className="flex h-9 w-9 items-center justify-center border border-primary/20 bg-primary/10">
                                    <ShieldCheck size={18} className="text-primary" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2">
                            <div className="border-r border-border p-6">
                                <p className="text-xs text-muted-foreground">Configuração</p>

                                <p className="mt-2 text-3xl font-medium">Simples</p>

                                <p className="mt-2 text-xs text-muted-foreground">poucos minutos</p>
                            </div>

                            <div className="p-6">
                                <p className="text-xs text-muted-foreground">Próximo passo</p>

                                <p className="mt-2 text-3xl font-medium">Dashboard</p>

                                <p className="mt-2 text-xs text-muted-foreground">sua operação</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-border px-6 py-4">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={15} className="text-primary" />

                                <span className="text-xs text-muted-foreground">Você está quase lá</span>
                            </div>

                            <ArrowRight size={15} className="text-primary" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
