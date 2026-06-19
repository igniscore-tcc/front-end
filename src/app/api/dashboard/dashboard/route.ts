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

  const query = `
    query Dashboard {
      dashboard {
        totalClients
        totalProducts
        totalSales
        monthlyRevenue
        pendingOrders
        expiringProducts
        currentMonthExpirations
        upcomingExpirations
        expiredExpirations
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
    }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    return NextResponse.json(
      {
        error: result.errors?.[0]?.message || "Erro ao buscar dashboard",
      },
      {
        status: response.status || 400,
      },
    );
  }

  return NextResponse.json(result.data.dashboard);
}
