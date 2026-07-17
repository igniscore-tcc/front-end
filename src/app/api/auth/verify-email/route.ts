import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email e código são obrigatórios." },
        { status: 400 },
      );
    }

    const response = await fetch(`${API_URL}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ email, code }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.error || "Erro ao processar a verificação de e-mail." },
        { status: response.status },
      );
    }

    console.log("Resposta do Spring Boot:", result);

    return NextResponse.json({
      message: result.message,
    });
  } catch (error) {
    console.error("Erro no Route Handler de verify-email:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor de autenticação." },
      { status: 500 },
    );
  }
}
