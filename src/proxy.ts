import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
    "/produtos",
    "/clientes",
    "/vendas",
    "/vencimentos",
    "/dashboard",
];

const firstLoginRoute = "/primeiro-acesso";

export async function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    const isFirstLoginRoute = pathname.startsWith(firstLoginRoute);

    if (!isProtectedRoute && !isFirstLoginRoute) {
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
            cache: "no-store",
        });

        if (!response.ok) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        const user = await response.json();
        if (user.firstLogin) {
            if (!isFirstLoginRoute) {
                return NextResponse.redirect(
                    new URL(firstLoginRoute, req.url)
                );
            }

            return NextResponse.next();
        }

        if (isFirstLoginRoute) {
            return NextResponse.redirect(
                new URL("/dashboard", req.url)
            );
        }

        return NextResponse.next();

    } catch {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}