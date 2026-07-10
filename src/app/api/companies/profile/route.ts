import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Token não informado." },
      { status: 401 },
    );
  }

  const query = `
    query MyCompany {
      myCompany {
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

  try {
    const response = await fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        query,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      return NextResponse.json(
        {
          error: result.errors?.[0]?.message || "Erro ao buscar empresa.",
        },
        {
          status: response.status || 500,
        },
      );
    }

    return NextResponse.json(result.data.myCompany);
  } catch {
    return NextResponse.json(
      { error: "Erro ao conectar com a API." },
      { status: 500 },
    );
  }
}
