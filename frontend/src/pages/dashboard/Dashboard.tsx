import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/sidebar/app-sidebar.tsx";

import React from "react";

export function Dashboard({children}: {children: React.ReactNode}) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            {children}
        </SidebarProvider>
    )
}
