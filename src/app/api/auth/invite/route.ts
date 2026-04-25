import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Token não encontrado." },
      { status: 401 },
    );
  }

  const query = `
    mutation UpdateUserCompany($cnpj: String!) {
      updateUserCompany(cnpj: $cnpj) {
        id
        name
        email
        role
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
        cnpj: body.cnpj,
      },
    }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    return NextResponse.json(
      {
        error:
          result.errors?.[0]?.message ||
          "Erro ao atualizar empresa do usuário.",
      },
      { status: response.status || 400 },
    );
  }

  return NextResponse.json(result.data.updateUserCompany);
}
