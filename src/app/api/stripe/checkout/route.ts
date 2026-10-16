import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

const planCodes: Record<string, string> = {
    starter: "STARTER",
    business: "BUSINESS",
    professional: "PROFESSIONAL",
};

export async function POST(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { error: "Token não informado." },
            { status: 401 },
        );
    }

    try {
        const body = await req.json();

        const plan = body.plan;

        if (!plan || !planCodes[plan]) {
            return NextResponse.json(
                { error: "Plano inválido." },
                { status: 400 },
            );
        }

        const planCode = planCodes[plan];

        const query = `
            mutation CreateCheckout(
                $planCode: String!
                $currency: Currency!
            ) {
                createCheckout(
                    input: {
                        planCode: $planCode
                        currency: $currency
                    }
                ) {
                    status
                    message
                    sessionId
                    sessionUrl
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
            body: JSON.stringify({
                query,
                variables: {
                    planCode,
                    currency: "BRL",
                },
            }),
        });

        const result = await response.json();

        if (!response.ok || result.errors) {
            return NextResponse.json(
                {
                    error:
                        result.errors?.[0]?.message ||
                        "Erro ao criar checkout.",
                },
                {
                    status: response.status || 400,
                },
            );
        }

        const checkout = result.data?.createCheckout;

        if (!checkout?.sessionUrl) {
            return NextResponse.json(
                {
                    error:
                        checkout?.message ||
                        "Não foi possível gerar o checkout.",
                },
                { status: 400 },
            );
        }

        return NextResponse.json({
            url: checkout.sessionUrl,
            sessionId: checkout.sessionId,
            status: checkout.status,
        });
    } catch (error) {
        console.error("Erro ao criar checkout:", error);

        return NextResponse.json(
            { error: "Erro interno ao iniciar pagamento." },
            { status: 500 },
        );
    }
}