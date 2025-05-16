import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <SiteHeader/>
        <main className="p-4">          
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
