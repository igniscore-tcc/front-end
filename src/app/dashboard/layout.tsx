import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="pb-16 md:pb-0 md:pl-20 min-h-screen">
        {children}
      </main>
    </>
  );
}
