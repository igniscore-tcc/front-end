import { NextRequest, NextResponse } from "next/server";
import { Me } from "@/types/me";

const API_URL = process.env.API_URL!;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const response = await fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query {
            me {
              id
              name
              email
              role
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors || !result.data?.me) {
      return NextResponse.json({ error: "Usuário inválido" }, { status: 401 });
    }

    const me: Me = result.data.me;

    return NextResponse.json(me);
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
