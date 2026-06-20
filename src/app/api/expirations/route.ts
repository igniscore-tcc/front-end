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

  const searchParams = req.nextUrl.searchParams;

  const page = Number(searchParams.get("page") ?? "0");
  const size = Number(searchParams.get("size") ?? "10");

  const query = `
    query Expirations($page: Int!, $size: Int!) {
      expirations(page: $page, size: $size) {
        items {
          expirationId
          saleId
          expirationNumber
          clientName
          saleDate
          dueDate
          totalSale
          status
        }
        totalItems
        totalPages
        currentPage
        pageSize
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
        variables: {
          page,
          size,
        },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      return NextResponse.json(
        {
          error: result.errors?.[0]?.message || "Erro ao buscar vencimentos",
        },
        {
          status: response.status || 500,
        },
      );
    }

    return NextResponse.json(result.data.expirations);
  } catch {
    return NextResponse.json(
      { error: "Erro ao conectar com a API." },
      { status: 500 },
    );
  }
}
