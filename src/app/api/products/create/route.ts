import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Token não informado." },
      { status: 401 },
    );
  }

  const query = `
  mutation StoreProduct($input: ProductStoreInput!) {
    storeProduct(input: $input) {
      id
      name
      type
      lot
      validity
      price
      status
      company {
        id
        name
      }
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
        input: body,
      },
    }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    const code = result.errors?.[0]?.extensions?.code;

    const statusMap: Record<string, number> = {
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
    };

    return NextResponse.json(
      {
        error: result.errors?.[0]?.message || "Erro ao cadastrar produto",
      },
      {
        status: statusMap[code] || 500,
      },
    );
  }

  return NextResponse.json(result.data.storeProduct);
}
