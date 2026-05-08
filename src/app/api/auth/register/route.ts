import { NextRequest, NextResponse } from "next/server";
import { normalizeEmail, validateEmail } from "@/lib/validators";

const API_URL = process.env.API_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = normalizeEmail(body?.email);

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ ...body, email }),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data);
}