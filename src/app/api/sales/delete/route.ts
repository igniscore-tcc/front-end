import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Token não informado." }, { status: 401 });
    }

    try {
        const body = await req.json();

        if (!body.saleId) {
            return NextResponse.json({ error: "saleId é obrigatório." }, { status: 400 });
        }

        const query = `
  mutation DeleteSale($saleId: ID!) {
    deleteSale(saleId: $saleId)
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
                    saleId: Number(body.saleId),
                },
            }),
        });

        const result = await response.json();

        if (!response.ok || result.errors) {
            return NextResponse.json(
                {
                    error: result.errors?.[0]?.message || "Erro ao excluir venda no servidor",
                },
                { status: 400 },
            );
        }

        return NextResponse.json({
            success: result.data.deleteSale,
        });
    } catch (err) {
        console.error("Erro na rota de exclusão de venda:", err);

        return NextResponse.json({ error: "Erro interno no servidor de API." }, { status: 500 });
    }
}
