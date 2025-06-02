"use client"

import * as React from "react"
import {  
    BookA,
  Bot,
  FileQuestion,
  Flower2,
  GalleryVerticalEnd,
  SquareTerminal,
  User2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "PostNatal Care",
      logo: Flower2,
      plan: "",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: SquareTerminal,
      isActive: true,      
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: Bot,
    },
    {
      title: "Articles",
      url: "/admin/articles",
      icon: BookA,
    },
    {
      title: "Questionnaires",
      url: "/admin/questionnaires",
      icon: FileQuestion,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: User2,
    },
    
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
