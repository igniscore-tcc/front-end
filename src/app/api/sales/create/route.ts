import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

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

    if (
      !body.clientId ||
      !body.paymentMethod ||
      !body.items ||
      !Array.isArray(body.items)
    ) {
      return NextResponse.json(
        {
          error:
            "Campos obrigatórios ausentes ou inválidos (clientId, paymentMethod, items).",
        },
        { status: 400 },
      );
    }

    const query = `
      mutation StoreSale($input: CreateSaleInput!) {
        storeSale(input: $input) {
          id
          quantityItems
          discount
          total
          date
          paymentMethod
          status
          dueDate
        }
      }
    `;

    const response = await fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            clientId: Number(body.clientId),
            paymentMethod: body.paymentMethod,
            items: body.items.map((item: any) => ({
              productId: Number(item.productId),
              quantity: Number(item.quantity),
              unitPrice: Number(item.unitPrice),
            })),
          },
        },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      return NextResponse.json(
        {
          error:
            result.errors?.[0]?.message || "Erro ao criar venda no servidor",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(result.data.storeSale);
  } catch (err) {
    console.error("Erro na rota de criação de venda:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor de API." },
      { status: 500 },
    );
  }
}
