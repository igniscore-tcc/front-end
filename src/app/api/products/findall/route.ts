import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function GET(req: NextRequest) {
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Token não informado." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? "0");
  const size = Number(searchParams.get("size") ?? "10");

  const query = `
    query Products($page: Int!, $size: Int!) {
      products(page: $page, size: $size) {
        id
        name
        type
        validity
        lot
        price
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
      Authorization: authorization,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({
      query,
      variables: {
        page,
        size,
      },
    }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    return NextResponse.json(
      {
        error: result.errors?.[0]?.message || "Erro ao buscar produtos",
      },
      {
        status: response.status || 400,
      },
    );
  }

  return NextResponse.json(result.data.products);
}
