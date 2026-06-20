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
    const response = await fetch(`${process.env.API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query {
            me {
              id
              email
              role
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors || !result.data?.me) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
