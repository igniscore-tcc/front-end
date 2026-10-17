import type { Me } from "@/types/me";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

async function safeJson(response: Response): Promise<any> {
    const text = await response.text();

    if (!text) return {};

    try {
        return JSON.parse(text);
    } catch {
        return {};
    }
}

function isOfflineError(error: unknown): boolean {
    return error instanceof TypeError && /fetch|network|failed/i.test(error.message || "");
}

export function useMe() {
    const [user, setUser] = useState<Me | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchMe = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch("/api/auth/me", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                cache: "no-store",
            });

            const result = await safeJson(response);

            if (!response.ok) {
                throw new Error(result.error || "Erro ao buscar dados do usuário");
            }

            setUser(result as Me);
        } catch (error) {
            console.error("Erro ao carregar usuário:", error);

            toast.error(
                isOfflineError(error)
                    ? "Servidor indisponível. Tente novamente em instantes."
                    : error instanceof Error
                      ? error.message
                      : "Erro ao carregar usuário",
            );

            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    return {
        user,
        loading,
        refreshMe: fetchMe,
    };
}
