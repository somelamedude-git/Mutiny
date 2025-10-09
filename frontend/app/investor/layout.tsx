"use client"

import type * as React from "react"
import Link from "next/link"
import { Suspense } from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppInvestorSidebar } from "@/components/app-investor-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Search, Plus, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { AvatarProvider, useAvatar } from "@/components/avatar-context"

function InvestorLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const seg = pathname?.split("/").filter(Boolean)[1]
  const section =
    { search: "Search", investments: "Investments", chats: "Chats", profile: "Profile" }[seg ?? ""] ?? "Overview"
  
  const { avatarUrl, userName } = useAvatar()

  // Get initials for fallback
  const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/)
    const first = words[0]?.[0] ?? "A"
    const last = words[1]?.[0] ?? "R"
    return (first + last).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <SidebarProvider>
        <AppInvestorSidebar />

        <SidebarInset className="bg-[#0a0a0c] text-white">
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <header className="flex h-14 shrink-0 items-center gap-2 border-b border-[#1a1b1e] px-4 bg-[#0a0a0c] py-10">
              <SidebarTrigger className="-ml-1 text-white/80 hover:text-white" />
              <Separator orientation="vertical" className="mr-2 h-5 bg-[#1a1b1e]" />
              <nav className="flex items-center gap-2 sm:gap-3 my-5">
                <Link href="/investor" className="text-sm sm:text-base font-semibold tracking-tight">
                  Investor
                </Link>
                <span className="text-white/40">/</span>
                <span className="text-white/70 text-sm">{section}</span>
              </nav>

              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <div className="relative hidden md:block">
                  <Search className="pointer-events-none absolute left-2 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    placeholder="Search projects, domains, founders…"
                    className="h-8 w-[260px] pl-8 bg-[#101113] border-[#1a1b1e] text-white placeholder:text-white/40"
                  />
                </div>
                <Button
                  size="sm"
                  className={cn(
                    "h-8 rounded-md bg-white text-[#0b0b0c] hover:bg-white/90",
                    "shadow-[0_0_0_1px_rgba(255,255,255,0.10)_inset]",
                  )}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New allocation
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/80 hover:text-white">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <Link href="/investor/profile" className="block">
                  <div className="h-8 w-8 rounded-md ring-1 ring-[#1a1b1e] bg-[#101113] overflow-hidden cursor-pointer hover:ring-white/30 transition-all">
                    {avatarUrl ? (
                      <img 
                        src={avatarUrl} 
                        alt={userName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-[10px] font-medium text-white/70">
                        {getInitials(userName)}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            </header>
          </Suspense>
          <div className="flex-1 p-6 sm:p-8 lg:p-10 bg-[#0a0a0c]">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return (
    <AvatarProvider>
      <InvestorLayoutContent>{children}</InvestorLayoutContent>
    </AvatarProvider>
  )
}