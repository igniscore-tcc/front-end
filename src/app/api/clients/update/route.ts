import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Token não informado." },
      { status: 401 },
    );
  }

  const query = `
    mutation UpdateClient($input: ClientUpdateInput!) {
      updateClient(input: $input) {
        id
        number
        name
        cnpj
        cpf
        email
        phone
        ie
        ufIe
        obs
        company {
          id
          name
          email
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
        input: body,
      },
    }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    return NextResponse.json(
      {
        error: result.errors?.[0]?.message || "Erro ao atualizar cliente",
      },
      { status: response.status || 400 },
    );
  }

  return NextResponse.json(result.data.updateClient);
}
