"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,  
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  Flower2,
  Flower2Icon
  
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"

const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Articles",
      url: "/admin/articles",
      icon: ListIcon,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChartIcon,
    },
    {
      title: "Questionnaires",
      url: "/admin/questionnaires",
      icon: FolderIcon,
    },
    
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isSignedIn, user, isLoaded } = useUser()
  if (!user) return null
  const userPersona = {
    name:user.firstName,
    email:user.emailAddresses[0].emailAddress,
    avatar:user.imageUrl
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Flower2Icon className="h-5 w-5" />
                <span className="text-base font-semibold">PostNatal Care.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userPersona} />
      </SidebarFooter>
    </Sidebar>
  )
}
