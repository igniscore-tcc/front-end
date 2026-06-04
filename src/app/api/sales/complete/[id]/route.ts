import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Token não informado." },
      { status: 401 },
    );
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "ID da venda não informado." },
      { status: 400 },
    );
  }

  const query = `
    mutation CompleteSale($saleId: ID!) {
      completeSale(saleId: $saleId) {
        id
        status
        total
        discount
        quantityItems
        date
        paymentMethod
        dueDate
      }
    }
  `;

  const response = await fetch(`${API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ query, variables: { saleId: id } }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    return NextResponse.json(
      { error: result.errors?.[0]?.message || "Erro ao completar venda" },
      { status: response.status || 400 },
    );
  }

  return NextResponse.json(result.data.completeSale);
}
