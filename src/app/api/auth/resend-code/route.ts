import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório." },
        { status: 400 },
      );
    }

    const response = await fetch(`${API_URL}/auth/resend-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ email }),
    });

    const text = await response.text();
    const result = text ? JSON.parse(text) : {};

    if (!response.ok) {
      return NextResponse.json(
        { error: result.error || "Erro ao processar o reenvio do código." },
        { status: response.status },
      );
    }

    console.log("Resposta do Spring Boot:", result);

    return NextResponse.json({
      message: result.message,
    });
  } catch (error) {
    console.error("Erro no Route Handler de resend-code:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor de autenticação." },
      { status: 500 },
    );
  }
}
