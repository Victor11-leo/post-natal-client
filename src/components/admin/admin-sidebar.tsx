"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Home, ListChecks, Menu, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export function AdminSidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/articles", label: "Articles", icon: FileText },
    { href: "/admin/questionnaires", label: "Questionnaires", icon: ListChecks },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/users", label: "Users", icon: Users },
  ]

  if (isMobile && !sidebarOpen) {
    return (
      <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50" onClick={() => setSidebarOpen(true)}>
        <Menu className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/admin" className="flex items-center">
          <h1 className="text-xl font-bold text-purple-800">MamaCare Admin</h1>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <nav className="mt-5 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-2 flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-purple-100 text-purple-800" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
