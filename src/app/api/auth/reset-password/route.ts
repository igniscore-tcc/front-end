import { NextRequest, NextResponse } from "next/server";
import { normalizeEmail, validateEmail } from "@/lib/validators";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = normalizeEmail(body?.email);

    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        query: `
          mutation RequestRecovery($email: String!) {
            requestPasswordRecovery(email: $email)
          }
        `,
        variables: { email },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    if (result.errors) {
      return NextResponse.json(
        { error: result.errors[0].message }, 
        { status: 400 }
      );
    }

    console.log(result.data);

    // Retorna a mensagem de sucesso tratada pelo Spring
    return NextResponse.json({ 
      message: result.data.requestPasswordRecovery 
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor de autenticação" }, 
      { status: 500 }
    );
  }
}
