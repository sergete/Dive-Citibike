"use client"

import * as React from "react"
import {
    Download,
    ChartColumnIncreasing
} from "lucide-react"

import { NavUser } from "./nav-user.tsx"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader
} from "../ui/sidebar.tsx"
import {NavMain} from "./nav-main.tsx";
import {SidebarLogo} from "@/components/sidebar/sidebar_logo.tsx";

// This is sample data.
const data = {
    user: {
        name: "Sergio",
        avatar: "/avatar/morty_avatar.jpg",
    },
    navMain: [
        {
            title: "Data",
            url: "#",
            icon: Download,
            isActive: true,
            items: [
                {
                    title: "Cicle Trips",
                    url: "/links",
                }
            ],
        },
        {
            title: "Statistics",
            url: "#",
            isActive: true,
            icon: ChartColumnIncreasing,
            items: [
                {
                    title: "Cicle Stats",
                    url: "/stats",
                }
            ],
        }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="floating" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarLogo/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
