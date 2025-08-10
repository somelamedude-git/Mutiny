"use client"

import type * as React from "react"
import Link from "next/link"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Bell, Plus, Search } from "lucide-react"
import { AppDashboardSidebar } from "@/components/app-dashboard-sidebar"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppDashboardSidebar />
      <SidebarInset className="bg-[#0a0a0c] text-white">
        <Suspense fallback={<div>Loading...</div>}>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-white/10 px-4">
            <SidebarTrigger className="-ml-1 text-white/80 hover:text-white" />
            <Separator orientation="vertical" className="mr-2 h-5 bg-white/10" />
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="text-sm sm:text-base font-semibold tracking-tight">
                Overview
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white/60 text-sm">Welcome</span>
            </div>
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <div className="relative hidden md:block">
                <Search className="pointer-events-none absolute left-2 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input
                  placeholder="Search ideas, people, funding..."
                  className="h-8 w-[220px] pl-8 bg-black/40 border-white/15 text-white placeholder:text-white/40"
                />
              </div>
              <Button
                size="sm"
                className={cn(
                  "h-8 rounded-full bg-white text-black hover:bg-[#e3c27a] hover:text-black",
                  "shadow-[0_0_0_1px_rgba(255,255,255,0.16)_inset,0_8px_30px_rgba(227,194,122,0.2)]",
                )}
              >
                <Plus className="mr-2 h-4 w-4" />
                New
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/80 hover:text-white">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#e3c27a] via-[#34d399] to-[#f472b6] ring-1 ring-white/30" />
            </div>
          </header>
        </Suspense>
        <div className="flex-1 p-4 sm:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
