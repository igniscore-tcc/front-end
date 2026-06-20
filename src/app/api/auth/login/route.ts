import { NextRequest, NextResponse } from "next/server";
import { normalizeEmail, validateEmail } from "@/lib/validators";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = normalizeEmail(body?.email);

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ ...body, email }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, {
      status: response.status,
    });
  }

  console.log(data);

  const nextResponse = NextResponse.json(data);

  nextResponse.cookies.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  return nextResponse;
}
