import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function PATCH(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Token não informado." }, { status: 401 });
    }

    try {
        const body = await req.json();

        if (!body.saleId || !body.status) {
            return NextResponse.json(
                {
                    error: "Campos obrigatórios ausentes (saleId, status).",
                },
                { status: 400 },
            );
        }

        const query = `
      mutation UpdateSaleStatus(
        $saleId: Int!
        $status: SaleStatus!
      ) {
        updateSaleStatus(
          saleId: $saleId
          status: $status
        ) {
          id
          numberSale
          quantityItems
          discount
          total
          date
          paymentMethod
          status
          type
          document
          dueDate
        }
      }
    `;

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
                    saleId: Number(body.saleId),
                    status: body.status,
                },
            }),
        });

        const result = await response.json();

        if (!response.ok || result.errors) {
            return NextResponse.json(
                {
                    error: result.errors?.[0]?.message || "Erro ao atualizar status da venda",
                },
                { status: 400 },
            );
        }

        return NextResponse.json(result.data.updateSaleStatus);
    } catch (err) {
        console.error("Erro na rota de atualização de status da venda:", err);

        return NextResponse.json({ error: "Erro interno no servidor de API." }, { status: 500 });
    }
}
