"use client";

import { useCallback, useEffect, useState } from "react";

export type SubscriptionStatus = "ACTIVE" | "TRIALING" | "PAST_DUE" | "CANCELED" | "INCOMPLETE";

export type Subscription = {
    id: string;
    status: SubscriptionStatus;
    cancelAtPeriodEnd: boolean;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    planName: string | null;
    amount: number | null;
    currency: string | null;
    interval: string | null;
};

type SubscriptionResponse = {
    subscription: Subscription | null;
};

type ErrorResponse = {
    error?: string;
};

export function useMySubscription() {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSubscription = useCallback(async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }

        setError(null);

        try {
            const response = await fetch("/api/stripe/mysubscription", {
                method: "GET",
                cache: "no-store",
            });

            const result = (await response.json()) as SubscriptionResponse & ErrorResponse;

            if (!response.ok) {
                throw new Error(result.error || "Erro ao buscar assinatura.");
            }

            setSubscription(result.subscription ?? null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro inesperado ao buscar assinatura.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        void fetchSubscription();
    }, [fetchSubscription]);

    const refresh = useCallback(() => {
        return fetchSubscription(true);
    }, [fetchSubscription]);

    return {
        subscription,
        loading,
        refreshing,
        error,
        refresh,
    };
}
