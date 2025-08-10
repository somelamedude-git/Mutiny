"use client"

import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Home, Lightbulb, Users, Coins, Activity, Shield, Settings, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const navMain = [
  { title: "Overview", url: "/dashboard", icon: Home, isActive: true },
  { title: "Ideas", url: "/dashboard/ideas", icon: Lightbulb },
  { title: "Matches", url: "/dashboard/matches", icon: Users },
  { title: "Funding", url: "/dashboard/funding", icon: Coins },
  { title: "Activity", url: "/dashboard/activity", icon: Activity },
  { title: "Trust", url: "/dashboard/trust", icon: Shield },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppDashboardSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon" className="bg-[#0a0a0c] text-white">
      <SidebarHeader className="border-b border-white/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-sm bg-gradient-to-br from-[#e3c27a] via-[#34d399] to-[#f472b6]" />
                    <span>Mutiny</span>
                  </div>
                  <ChevronDown className="opacity-60" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-(--radix-popper-anchor-width)">
                <DropdownMenuItem>Switch workspace</DropdownMenuItem>
                <DropdownMenuItem>Invite people</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <Button className="w-full justify-start h-8 text-sm bg-white text-black hover:bg-[#e3c27a]">
              New idea
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10">
        <div className="rounded-md bg-white/5 px-2 py-2 text-[11px] leading-tight text-white/70">
          Tip: Press Ctrl/Cmd + B to toggle the sidebar.
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
