import { NextRequest, NextResponse } from "next/server";
import { normalizeEmail, validateEmail } from "@/lib/validators";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = normalizeEmail(body?.email);

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Token não encontrado." },
      { status: 401 },
    );
  }

  const query = `
    mutation CreateCompany($input: CreateCompanyInput!) {
      createCompany(input: $input) {
        id
        name
        cnpj
        ie
        ufIe
        email
        phone
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
        input: {
          name: body.name,
          cnpj: body.cnpj,
          ie: body.ie,
          ufIe: body.ufIe,
          email,
          phone: body.phone,
        },
      },
    }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    return NextResponse.json(
      {
        error: result.errors?.[0]?.message || "Erro ao cadastrar empresa.",
      },
      { status: response.status || 400 },
    );
  }

  return NextResponse.json(result.data.createCompany);
}
