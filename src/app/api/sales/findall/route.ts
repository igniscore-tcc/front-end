import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function GET(req: NextRequest) {
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Token não informado." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? "0");
  const size = Number(searchParams.get("size") ?? "10");

  const query = `
    query Sales($page: Int!, $size: Int!) {
      sales(page: $page, size: $size) {
        sales {
          id
          total
          discount
          date
          paymentMethod
          status
          client {
            id
            name
            cpf
            cnpj
          }
          items {
            id
            quantity
            unitPrice
            total
            product {
              id
              name
            }
          }
        }
        totalPages
        totalSales
      }
    }
  `;

  try {
    const response = await fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ query, variables: { page, size } }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      return NextResponse.json(
        { error: result.errors?.[0]?.message || "Erro ao buscar vendas" },
        { status: response.status || 400 },
      );
    }

    const salesDTO = result.data?.sales;
    const salesList = salesDTO?.sales ?? [];
    const totalSales = salesDTO?.totalSales ?? 0;

    return NextResponse.json({ 
      sales: salesList, 
      totalSales: totalSales 
    });

  } catch (err) {
    console.error("Erro na rota findall:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor de API do Next." },
      { status: 500 }
    );
  }
}