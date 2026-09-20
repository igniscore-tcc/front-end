import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Token não informado." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? "0");
  const size = Number(searchParams.get("size") ?? "10");

  if (Number.isNaN(page) || Number.isNaN(size) || page < 0 || size <= 0) {
    return NextResponse.json(
      { error: "Parâmetros de paginação inválidos." },
      { status: 400 },
    );
  }

  const query = `
    query UsersByCompany($page: Int, $size: Int) {
      usersByCompany(page: $page, size: $size) {
        content {
          id
          name
          email
          role
        }
        totalElements
        totalPages
        number
        size
      }
    }
  `;

  try {
    const response = await fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          page,
          size,
        },
      }),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Erro ao consultar a API GraphQL.",
          details: result,
        },
        { status: response.status },
      );
    }

    if (result.errors) {
      return NextResponse.json(
        {
          error: "Erro na consulta GraphQL.",
          details: result.errors,
        },
        { status: 400 },
      );
    }

    if (!result.data?.usersByCompany) {
      return NextResponse.json(
        { error: "Nenhum dado de usuário foi retornado." },
        { status: 404 },
      );
    }

    return NextResponse.json(result.data.usersByCompany);
  } catch (error) {
    console.error("GraphQL request error:", error);

    return NextResponse.json(
      { error: "Erro interno ao consultar a API." },
      { status: 500 },
    );
  }
}
