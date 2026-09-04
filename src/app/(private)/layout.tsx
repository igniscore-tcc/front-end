import { cookies, headers } from "next/headers"; // Adicionado "headers"
import { redirect } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Bloqueio Mobile antes de qualquer requisição pesada
  const reqHeaders = await headers();
  const userAgent = reqHeaders.get("user-agent") || "";
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        textAlign: "center",
        fontFamily: "sans-serif"
      }}>
         <div
          className="h-[48px] w-[36px] bg-primary"
          role="img"
          aria-label="IgnisCore Logo"
          style={{
            maskImage: "url('/igniscore.svg')",
            WebkitMaskImage: "url('/igniscore.svg')",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        />
        <h1 className="mt-10">Acesso restrito</h1>
        <p className="mt-4">Este sistema está disponível apenas em computadores (Desktop).</p>
      <Link href={"/"} className="mt-8"><Button>Ir para página inicial</Button></Link>
      </div>
    );
  }

  // 2. Sua lógica de autenticação original
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

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
            name
            email
            role
            companyId
          }
        }
      `,
    }),
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || result.errors || !result.data?.me) {
    redirect("/login");
  }

  return <AuthProvider user={result.data.me}>{children}</AuthProvider>;
}
