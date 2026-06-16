import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET(req: NextRequest) {
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Token não informado." },
      { status: 401 },
    );
  }

  const query = `
    query {
        expirations {
            saleId
            clientName
            saleDate
            dueDate
            totalSale
            status
        }
    }
 `;

  try {
    const response = await fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        query,
        variables: {},
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      return NextResponse.json(
        {
          error: result.errors?.[0]?.message || "Erro ao buscar vencimentos",
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(result.data.expirations);
  } catch {
    return NextResponse.json(
      { error: "Erro ao conectar com a API." },
      { status: 500 },
    );
  }
}
