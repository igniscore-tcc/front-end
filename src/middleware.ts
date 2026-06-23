import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/produtos",
  "/clientes",
  "/vendas",
  "/vencimentos",
  "/dashboard",
];

export async function middleware(req: NextRequest) {
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const response = await fetch(new URL("/api/auth/me", req.url), {
      headers: {
        Cookie: req.headers.get("cookie") ?? "",
      },
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
