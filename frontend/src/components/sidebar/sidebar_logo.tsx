"use client"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "../ui/sidebar.tsx"

export function SidebarLogo() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <img className="size-4" src="/images/dive_tech_logo.jpg" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">
          Dive Tech
        </span>
                        <span className="truncate text-xs">Free</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

