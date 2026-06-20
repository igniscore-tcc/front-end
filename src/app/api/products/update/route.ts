import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Token não informado." },
      { status: 401 },
    );
  }

  const query = `
    mutation UpdateProduct($input: ProductUpdateInput!) {
      updateProduct(input: $input) {
        id
        numberProduct
        name
        type
        validity
        lot
        price
        status
        company {
          id
          name
        }
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
        input: body,
      },
    }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    return NextResponse.json(
      {
        error: result.errors?.[0]?.message || "Erro ao atualizar produto",
      },
      {
        status: response.status || 400,
      },
    );
  }

  return NextResponse.json(result.data.updateProduct);
}
