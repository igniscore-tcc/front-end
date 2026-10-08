import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const { id, name, email } = body;

    if (!id || !name || !email) {
      return NextResponse.json(
        { error: "ID, nome e e-mail são obrigatórios." },
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
          mutation UpdateEmployee($data: UserUpdateDTO!) {
            updateEmployee(data: $data)
          }
        `,
        variables: {
          data: {
            id,
            name,
            email,
          },
        },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      return NextResponse.json(
        {
          error: result.errors?.[0]?.message || "Erro ao atualizar funcionário",
        },
        { status: response.status || 400 },
      );
    }

    return NextResponse.json({
      message: result.data.updateEmployee,
    });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
