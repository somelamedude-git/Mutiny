"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
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
import { Home, Search, Coins, MessageSquareText, UserRound, Settings, ChevronDown, Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenuAction } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


const NAV = [
  { 
    id: 'overview',
    title: "Overview", 
    url: "/investor", 
    icon: Home,
    requiresAuth: true 
  },
  { 
    id: 'search',
    title: "Search", 
    url: "/investor/search", 
    icon: Search,
    requiresAuth: true,
    hasKeyboardShortcut: true 
  },
  { 
    id: 'investments',
    title: "Investments", 
    url: "/investor/investments", 
    icon: Coins,
    requiresAuth: true 
  },
  { 
    id: 'chats',
    title: "Chats", 
    url: "/investor/chats", 
    icon: MessageSquareText,
    requiresAuth: true,
    hasNotifications: true 
  },
  { 
    id: 'profile',
    title: "Profile", 
    url: "/investor/profile", 
    icon: UserRound,
    requiresAuth: true 
  },
  { 
    id: 'settings',
    title: "Settings", 
    url: "/investor/settings", 
    icon: Settings,
    requiresAuth: true 
  },
]


interface NotificationData {
  unreadChats: number
  newInvestmentOpportunities: number
  systemAlerts: number
}

interface UserProfile {
  id: string
  name: string
  email: string
  accountType: 'investor' | 'founder'
  avatar?: string
}

export function AppInvestorSidebar() {
  const pathname = usePathname()
  
  
  const [notifications, setNotifications] = useState<NotificationData>({
    unreadChats: 0,
    newInvestmentOpportunities: 0,
    systemAlerts: 0
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        
        const response = await fetch('/api/notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
           
            
          },
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setNotifications(data)
      } catch (err) {
        console.error('Failed to fetch notifications:', err)
        setError(err instanceof Error ? err.message : 'Failed to load notifications')
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
    
    
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])


  const handleAccountSwitch = async () => {
    try {
      setIsLoading(true)
      
 
      const response = await fetch('/api/account/switch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({ 
          targetAccountType: 'founder',
          currentPath: pathname 
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to switch account')
      }
      
      const { redirectUrl } = await response.json()
      window.location.href = redirectUrl || '/founder'
      
    } catch (err) {
      console.error('Account switch failed:', err)
      setError('Failed to switch account')
    } finally {
      setIsLoading(false)
    }
  }


  const handleNavClick = async (navItem: typeof NAV[0]) => {
    try {
     
      await fetch('/api/analytics/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: navItem.id,
          fromPath: pathname,
          toPath: navItem.url,
          timestamp: new Date().toISOString()
        }),
      }).catch(() => {}) 
    } catch (err) {
     
      console.warn('Analytics tracking failed:', err)
    }
  }

  
  const getNotificationCount = (navId: string): number => {
    switch (navId) {
      case 'chats':
        return notifications.unreadChats
      case 'investments':
        return notifications.newInvestmentOpportunities
      case 'settings':
        return notifications.systemAlerts
      default:
        return 0
    }
  }


  const isRouteActive = (url: string): boolean => {
    if (url === "/investor") {
      return pathname === url
    }
    return pathname?.startsWith(url) ?? false
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton 
                  size="lg" 
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  disabled={isLoading}
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <span className="text-xs font-bold">M</span>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Mutiny</span>
                    <span className="truncate text-xs">Investor</span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom" 
                align="start" 
                sideOffset={4}
              >
                <DropdownMenuItem 
                  onClick={handleAccountSwitch}
                  disabled={isLoading}
                  className="cursor-pointer"
                >
                  <span>{isLoading ? 'Switching...' : 'Switch to Founder Dashboard'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => {
                const active = isRouteActive(item.url)
                const notificationCount = getNotificationCount(item.id)
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={active}
                      onClick={() => handleNavClick(item)}
                    >
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                        {notificationCount > 0 && (
                          <Badge 
                            variant="destructive" 
                            className="ml-auto h-5 px-1.5 text-xs"
                          >
                            {notificationCount > 99 ? '99+' : notificationCount}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                    {item.hasKeyboardShortcut && item.title === "Search" && (
                      <SidebarMenuAction className="peer-data-[active=true]:text-sidebar-accent-foreground">
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                          ⌘K
                        </kbd>
                      </SidebarMenuAction>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/investor/discover">
                    <Search className="size-4" />
                    <span>Discover projects</span>
                    {notifications.newInvestmentOpportunities > 0 && (
                      <Badge 
                        variant="secondary" 
                        className="ml-auto h-5 px-1.5 text-xs"
                      >
                        {notifications.newInvestmentOpportunities}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {error && (
          <div className="px-2 py-1 text-xs text-destructive bg-destructive/10 rounded mb-2">
            {error}
          </div>
        )}
        <p className="px-2 text-xs text-muted-foreground">
          Tip: Press Ctrl/Cmd + B to toggle the sidebar.
        </p>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}