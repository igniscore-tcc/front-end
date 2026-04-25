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

  console.log("[clients route] page:", page, "size:", size);

  const query = `
    query Clients($page: Int!, $size: Int!) {
      clients(page: $page, size: $size) {
        id
        number
        name
        cnpj
        email
        phone
        ie
        cpf
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
        page: page,
        size,
      },
    }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    return NextResponse.json(
      {
        error: result.errors?.[0]?.message || "Erro ao buscar clientes",
      },
      {
        status: response.status || 400,
      },
    );
  }

  console.log("[clients route] response page meta:", result);

  return NextResponse.json(result.data.clients);
}
