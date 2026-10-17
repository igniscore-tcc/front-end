
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { error: "Token não informado." },
            { status: 401 },
        );
    }

    try {
        const query = `
            query MySubscription {
                mySubscription {
                    id
                    status
                    cancelAtPeriodEnd
                    currentPeriodStart
                    currentPeriodEnd
                    planName
                    amount
                    currency
                    interval
                }
            }
        `;

        const response = await fetch(`${API_URL}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({ query }),
            cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || result.errors) {
            return NextResponse.json(
                {
                    error:
                        result.errors?.[0]?.message ||
                        "Erro ao buscar assinatura.",
                },
                { status: response.ok ? 400 : response.status },
            );
        }

        const subscription = result.data?.mySubscription;

        return NextResponse.json({
            subscription: subscription ?? null,
        });
    } catch (error) {
        console.error("Erro ao buscar assinatura:", error);

        return NextResponse.json(
            { error: "Erro interno ao buscar assinatura." },
            { status: 500 },
        );
    }
}
