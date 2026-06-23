import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
