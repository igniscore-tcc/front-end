import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const { newPassword, confirmPassword } = body;

    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "A nova senha e a confirmação são obrigatórias." },
        { status: 400 },
      );
    }

    const response = await fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
                    mutation ChangeTemporaryPassword(
                        $data: ChangePasswordInput!
                    ) {
                        changeTemporaryPassword(data: $data)
                    }
                `,
        variables: {
          data: {
            newPassword,
            confirmPassword,
          },
        },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      return NextResponse.json(
        {
          error: result.errors?.[0]?.message || "Erro ao alterar a senha",
        },
        { status: response.status || 400 },
      );
    }

    return NextResponse.json({
      message: result.data.changeTemporaryPassword,
    });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
