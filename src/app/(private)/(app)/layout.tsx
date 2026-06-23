"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import SidebarMobile from "@/components/layout/SidebarMobile";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className="min-h-screen">
      <Sidebar isExpanded={isExpanded} onToggle={toggleSidebar} />
      <SidebarMobile />
      <main
        className={`pb-16 md:pb-0 min-h-screen transition-all duration-300 ease-in-out ${
          isExpanded ? "md:pl-64" : "md:pl-20"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
