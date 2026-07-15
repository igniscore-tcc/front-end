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

    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.error || "Ocorreu um erro no servidor" }, 
        { status: response.status }
      );
    }

    console.log(result);

    return NextResponse.json({
      message: result.message,
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor de autenticação" },
      { status: 500 }
    );
  }
}
