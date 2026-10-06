"use client";

import { useAuth } from "@/contexts/AuthContext";
import * as React from "react";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import { TeamSwitcher } from "@/components/layout/sidebar/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { UserRole } from "@/types/me";
import { LayoutDashboard, Settings2Icon } from "lucide-react";

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
            plan: "Gestão Inteligente",
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
                    id: "dashboard",
                },
                {
                    title: "Clientes",
                    url: "/clientes",
                    id: "clientes",
                },
                {
                    title: "Produtos",
                    url: "/produtos",
                    id: "produtos",
                },
                {
                    title: "Vendas",
                    url: "/vendas",
                    id: "vendas",
                },
                {
                    title: "Vencimentos",
                    url: "/vencimentos",
                    id: "vencimentos",
                },
                {
                    title: "Funcionários",
                    url: "/users",
                    id: "users",
                },
            ],
        },
        {
            title: "Configurações",
            url: "#",
            icon: <Settings2Icon />,
            items: [
                {
                    title: "Perfil da empresa",
                    url: "/configuracoes",
                    id: "configuracoes",
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

    const navItems = data.navMain.filter(item => item.title !== "Configurações" || user?.role === UserRole.OWNER);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={userData} />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
