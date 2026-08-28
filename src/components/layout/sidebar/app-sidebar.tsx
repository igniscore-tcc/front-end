"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavProjects } from "@/components/layout/sidebar/nav-projects";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import { TeamSwitcher } from "@/components/layout/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  LayoutDashboard,
} from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "IgnisCore",
      logo: (
        <div
          className="size-7 shrink-0 bg-primary"
          role="img"
          aria-label="IgnisCore"
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
      ),
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Principal",
      url: "#",
      icon: <LayoutDashboard />,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Clientes",
          url: "/clientes",
        },
        {
          title: "Produtos",
          url: "/produtos",
        },
        {
          title: "Vendas",
          url: "/vendas",
        },
        {
          title: "Vencimentos",
          url: "/vencimentos",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "Perfil da empresa",
          url: "/configuracoes",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: (
  //       <FrameIcon
  //       />
  //     ),
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: (
  //       <PieChartIcon
  //       />
  //     ),
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: (
  //       <MapIcon
  //       />
  //     ),
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  const userData = {
    name: user?.name || "Usuário",
    email: user?.email || "email@example.com",
    avatar: "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
