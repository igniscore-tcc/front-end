"use client";

import {
    ArrowUpRight,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    CreditCard,
    Download,
    FileText,
    LoaderCircle,
    ShieldCheck,
    X,
} from "lucide-react";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMySubscription, type SubscriptionStatus } from "@/hooks/useMySubscription";

type InvoiceStatus = "OPEN" | "PAID" | "VOID" | "UNCOLLECTIBLE";

type Invoice = {
    id: string;
    number: string;
    status: InvoiceStatus;
    createdAt: string;
    dueDate: string | null;
    amountDue: number;
    currency: string;
    paymentUrl?: string | null;
    receiptUrl?: string | null;
};

function formatCurrency(amount: number | null, currency: string | null) {
    if (amount === null || !currency) {
        return "Não informado";
    }

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency,
    }).format(amount / 100);
}

function formatDate(date: string | null) {
    if (!date) return "Não informado";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Não informado";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    })
        .format(new Date(`${date.slice(0, 10)}T12:00:00Z`))
        .replace(".", "");
}

function getSubscriptionStatus(status: SubscriptionStatus) {
    const statuses: Record<
        SubscriptionStatus,
        {
            label: string;
            variant: "default" | "secondary" | "destructive" | "outline";
        }
    > = {
        ACTIVE: {
            label: "Ativa",
            variant: "secondary",
        },
        TRIALING: {
            label: "Período de teste",
            variant: "secondary",
        },
        PAST_DUE: {
            label: "Pagamento atrasado",
            variant: "destructive",
        },
        CANCELED: {
            label: "Cancelada",
            variant: "outline",
        },
        INCOMPLETE: {
            label: "Incompleta",
            variant: "outline",
        },
    };

    return (
        statuses[status] ?? {
            label: status,
            variant: "outline" as const,
        }
    );
}

function getInvoiceStatus(status: InvoiceStatus) {
    const statuses: Record<
        InvoiceStatus,
        {
            label: string;
            variant: "secondary" | "outline" | "destructive";
        }
    > = {
        OPEN: {
            label: "Em aberto",
            variant: "outline",
        },
        PAID: {
            label: "Paga",
            variant: "secondary",
        },
        VOID: {
            label: "Anulada",
            variant: "outline",
        },
        UNCOLLECTIBLE: {
            label: "Não recebida",
            variant: "destructive",
        },
    };

    return statuses[status];
}

function SubscriptionSkeleton() {
    return (
        <main className="w-full space-y-6 px-10 py-8">
            <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-8 w-80" />
                <Skeleton className="h-4 w-96" />
            </div>

            <Separator />

            <Card className="shadow-none">
                <CardContent className="space-y-6 p-6">
                    <div className="flex justify-between">
                        <div className="flex gap-4">
                            <Skeleton className="h-12 w-12" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-72" />
                            </div>
                        </div>

                        <Skeleton className="h-10 w-36" />
                    </div>

                    <Separator />

                    <div className="grid grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} className="h-16 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-none">
                <CardHeader>
                    <Skeleton className="h-5 w-48" />
                </CardHeader>

                <CardContent className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="h-12 w-full" />
                    ))}
                </CardContent>
            </Card>
        </main>
    );
}

export default function SubscriptionPage() {
    const { subscription, loading, refreshing, error, refresh } = useMySubscription();

    const [cancelError, setCancelError] = useState<string | null>(null);

    const invoices: Invoice[] = [];

    const pendingInvoices = invoices.filter(invoice => invoice.status === "OPEN");

    const paidInvoices = invoices.filter(invoice => invoice.status === "PAID");

    const outstandingAmount = pendingInvoices.reduce((total, invoice) => total + invoice.amountDue, 0);

    if (loading) {
        return <SubscriptionSkeleton />;
    }

    if (error) {
        return (
            <main className="w-full px-10 py-8">
                <Card className="max-w-xl shadow-none">
                    <CardContent className="flex items-start gap-3 p-6">
                        <X className="mt-0.5 h-5 w-5 text-destructive" />

                        <div className="flex-1 space-y-2">
                            <p className="font-medium">Erro ao carregar a assinatura</p>

                            <p className="text-sm text-muted-foreground">{error}</p>

                            <Button variant="outline" onClick={() => void refresh()} disabled={refreshing}>
                                {refreshing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Tentar novamente
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        );
    }

    if (!subscription) {
        return (
            <main className="w-full space-y-4 px-10 py-8">
                <h1 className="text-2xl font-semibold tracking-tight">Assinatura e faturamento</h1>

                <Card className="shadow-none">
                    <CardContent className="flex items-center justify-between gap-4 p-6">
                        <div>
                            <p className="font-medium">Nenhuma assinatura encontrada</p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Contrate um plano para acessar os recursos do IgnisCore.
                            </p>
                        </div>

                        <Button variant="outline" onClick={() => void refresh()} disabled={refreshing}>
                            {refreshing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Atualizar
                        </Button>
                    </CardContent>
                </Card>
            </main>
        );
    }

    const status = getSubscriptionStatus(subscription.status);

    const interval = subscription.interval?.toLowerCase() ?? "mensal";

    const canCancel =
        ["ACTIVE", "TRIALING", "PAST_DUE"].includes(subscription.status) && !subscription.cancelAtPeriodEnd;

    return (
        <main className="w-full space-y-6 bg-background px-10 py-8 text-foreground">
            <header className="flex items-end justify-between gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Configurações</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground">Faturamento</span>
                    </div>

                    <h1 className="text-2xl font-semibold tracking-tight">Assinatura e faturamento</h1>

                    <p className="text-sm text-muted-foreground">Consulte seu plano, pagamentos e cobranças.</p>
                </div>

                <Button variant="outline" onClick={() => void refresh()} disabled={refreshing} className="gap-2">
                    <LoaderCircle className={`h-4 w-4 ${refreshing ? "animate-spin" : "hidden"}`} />
                    Atualizar dados
                </Button>
            </header>

            <Separator />

            {pendingInvoices.length > 0 && (
                <section className="flex items-center justify-between gap-8 border border-border bg-muted/30 p-5">
                    <div className="flex items-start gap-3">
                        <div>
                            <p className="text-sm font-semibold">Pagamento pendente</p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {pendingInvoices.length} cobrança(s) em aberto, totalizando{" "}
                                <span className="font-medium text-foreground">
                                    {formatCurrency(outstandingAmount, subscription.currency)}
                                </span>
                                .
                            </p>
                        </div>
                    </div>

                    <p className="shrink-0 text-right text-sm">
                        <span className="block text-xs text-muted-foreground">Próximo vencimento</span>

                        <span className="font-medium">
                            {formatDate(
                                pendingInvoices
                                    .slice()
                                    .sort((a, b) =>
                                        (a.dueDate ?? "9999-12-31").localeCompare(b.dueDate ?? "9999-12-31"),
                                    )[0].dueDate,
                            )}
                        </span>
                    </p>
                </section>
            )}

            <section className="space-y-3">
                <h2 className="text-base font-semibold">Plano atual</h2>

                <Card className="overflow-hidden shadow-none">
                    <CardContent className="p-0">
                        <div className="flex items-start justify-between gap-8 p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-xl font-semibold">{subscription.planName || "Plano"}</h3>

                                        <Badge variant={status.variant}>{status.label}</Badge>
                                    </div>

                                    <p className="text-sm text-muted-foreground">Cobrança {interval}.</p>

                                    {subscription.cancelAtPeriodEnd && (
                                        <p className="text-sm text-muted-foreground">
                                            Cancelamento programado para o fim do período atual.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="shrink-0 text-right">
                                <p className="text-xs text-muted-foreground">Valor da assinatura</p>

                                <p className="mt-1 text-3xl font-semibold tabular-nums">
                                    {formatCurrency(subscription.amount, subscription.currency)}

                                    <span className="ml-1 text-sm font-normal text-muted-foreground">/ {interval}</span>
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-3 divide-x">
                            <div className="flex items-start gap-3 p-6">
                                <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />

                                <div>
                                    <p className="text-xs text-muted-foreground">Fim do período atual</p>

                                    <p className="mt-1 text-sm font-medium">
                                        {formatDate(subscription.currentPeriodEnd)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-6">
                                <CreditCard className="mt-0.5 h-4 w-4 text-muted-foreground" />

                                <div>
                                    <p className="text-xs text-muted-foreground">Processamento</p>

                                    <p className="mt-1 text-sm font-medium">Stripe</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-6">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-muted-foreground" />

                                <div>
                                    <p className="text-xs text-muted-foreground">Faturas pagas</p>

                                    <p className="mt-1 text-sm font-medium">{paidInvoices.length}</p>
                                </div>
                            </div>
                        </div>

                        {canCancel && (
                            <>
                                <Separator />

                                <div className="flex items-center justify-between gap-8 bg-muted/30 px-6 py-4">
                                    <div>
                                        <p className="text-sm font-medium">Cancelar assinatura</p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            O cancelamento deve ser realizado pela integração com o Stripe.
                                        </p>
                                    </div>

                                    <Button
                                        variant="outline"
                                        disabled
                                        title="Integre a ação com a rota de cancelamento"
                                    >
                                        Cancelar assinatura
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {cancelError && (
                    <p role="alert" className="text-sm text-destructive">
                        {cancelError}
                    </p>
                )}
            </section>

            <section className="space-y-3">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-base font-semibold">Histórico de faturas</h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Consulte os valores, vencimentos e comprovantes.
                        </p>
                    </div>

                    <span className="text-xs text-muted-foreground">{invoices.length} registro(s)</span>
                </div>

                <Card className="overflow-hidden shadow-none">
                    <CardHeader className="border-b bg-muted/30 px-6 py-4">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            Faturas
                        </CardTitle>

                        <CardDescription>
                            As cobranças aparecerão aqui quando a integração com as faturas estiver disponível.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                        {invoices.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <p className="text-sm font-medium">Nenhuma fatura encontrada</p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Ainda não há faturas disponíveis para exibição.
                                </p>
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/20 text-left text-xs text-muted-foreground">
                                        <th className="px-6 py-3 font-medium">Fatura</th>
                                        <th className="px-4 py-3 font-medium">Emissão</th>
                                        <th className="px-4 py-3 font-medium">Vencimento</th>
                                        <th className="px-4 py-3 text-right font-medium">Valor</th>
                                        <th className="px-4 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 text-right font-medium">Ação</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {invoices.map(invoice => {
                                        const invoiceStatus = getInvoiceStatus(invoice.status);

                                        return (
                                            <tr key={invoice.id} className="border-b last:border-0 hover:bg-muted/30">
                                                <td className="px-6 py-4 font-medium">{invoice.number}</td>

                                                <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                                                    {formatDate(invoice.createdAt)}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                                                    {formatDate(invoice.dueDate)}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-4 text-right font-medium tabular-nums">
                                                    {formatCurrency(invoice.amountDue, invoice.currency)}
                                                </td>

                                                <td className="px-4 py-4">
                                                    <Badge variant={invoiceStatus.variant} className="font-normal">
                                                        {invoiceStatus.label}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    {invoice.status === "OPEN" && invoice.paymentUrl ? (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                window.open(
                                                                    invoice.paymentUrl!,
                                                                    "_blank",
                                                                    "noopener,noreferrer",
                                                                )
                                                            }
                                                        >
                                                            Pagar
                                                            <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                                                        </Button>
                                                    ) : invoice.status === "PAID" && invoice.receiptUrl ? (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                window.open(
                                                                    invoice.receiptUrl!,
                                                                    "_blank",
                                                                    "noopener,noreferrer",
                                                                )
                                                            }
                                                        >
                                                            <Download className="mr-1 h-3.5 w-3.5" />
                                                            Recibo
                                                        </Button>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}
