import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID do funcionário é obrigatório." },
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
          mutation DeleteEmployee($id: Int!) {
            deleteEmployee(id: $id)
          }
        `,
        variables: {
          id,
        },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      return NextResponse.json(
        {
          error:
            result.errors?.[0]?.message ||
            "Não foi possível excluir o funcionário",
        },
        { status: response.status || 400 },
      );
    }

    return NextResponse.json({
      message: result.data.deleteEmployee,
    });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
