import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Token não informado." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const mutation = `
      mutation AddSaleItem(
        $saleId: Int!,
        $productId: Int!,
        $quantity: Int!,
        $unitPrice: Float!
      ) {
        addSaleItem(
          input: {
            saleId: $saleId
            productId: $productId
            quantity: $quantity
            unitPrice: $unitPrice
          }
        ) {
          id
          total
          quantityItems
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
      body: JSON.stringify({
        query: mutation,
        variables: {
          saleId: Number(body.saleId),
          productId: Number(body.productId),
          quantity: Number(body.quantity),
          unitPrice: Number(body.unitPrice),
        },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      return NextResponse.json(
        {
          error:
            result.errors?.[0]?.message ||
            "Erro ao adicionar item",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(result.data.addSaleItem);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}