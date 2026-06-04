import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, { params }: Params) {
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
      { error: "ID do item não informado." },
      { status: 400 },
    );
  }

  const query = `
    mutation RemoveSaleItem($saleItemId: ID!) {
      removeSaleItem(saleItemId: $saleItemId) {
        id
        quantityItems
        total
        items {
          id
          quantity
          unitPrice
          total
          product {
            id
            name
            type
          }
        }
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
    body: JSON.stringify({ query, variables: { saleItemId: id } }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    return NextResponse.json(
      { error: result.errors?.[0]?.message || "Erro ao remover item" },
      { status: response.status || 400 },
    );
  }

  return NextResponse.json(result.data.removeSaleItem);
}
