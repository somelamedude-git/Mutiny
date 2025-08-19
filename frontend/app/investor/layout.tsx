"use client"

import type * as React from "react"
import Link from "next/link"
import { Suspense, useMemo, useCallback, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppInvestorSidebar } from "@/components/app-investor-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationCount {
  total: number
  unread: number
}

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
}

const THEME_COLORS = {
  background: '#0a0a0c',
  border: '#1a1b1e',
  input: '#101113',
  textPrimary: 'white',
  textSecondary: 'white/70',
  textMuted: 'white/40',
} as const

const SECTION_MAP: Record<string, string> = {
  search: "Search",
  investments: "Investments", 
  chats: "Chats",
  profile: "Profile",
  settings: "Settings"
}

const SEARCH_PLACEHOLDER = "Search projects, domains, founders…"

function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationCount>({
    total: 0,
    unread: 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('/api/notifications/count', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch notifications: ${response.status}`)
        }
        
        const data = await response.json()
        setNotifications(data)
      } catch (err) {
        console.error('Notifications fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load notifications')
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
    
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  return { notifications, isLoading, error }
}

function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile')
        if (response.ok) {
          const data = await response.json()
          setProfile(data)
        }
      } catch (err) {
        console.error('Profile fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return { profile, isLoading }
}

function HeaderNavigation({ 
  section, 
  className 
}: { 
  section: string
  className?: string 
}) {
  return (
    <nav className={cn("flex items-center gap-2 sm:gap-3 my-5", className)}>
      <Link 
        href="/investor" 
        className="text-sm sm:text-base font-semibold tracking-tight hover:text-white/80 transition-colors"
      >
        Investor
      </Link>
      <span className="text-white/40">/</span>
      <span className="text-white/70 text-sm">{section}</span>
    </nav>
  )
}

function SearchInput({ className }: { className?: string }) {
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/investor/search?q=${encodeURIComponent(searchValue.trim())}`)
    }
  }, [searchValue, router])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      const input = e.target as HTMLInputElement
      input.focus()
    }
  }, [handleSearch])

  return (
    <form onSubmit={handleSearch} className={cn("relative hidden md:block", className)}>
      <Search className="pointer-events-none absolute left-2 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/40" />
      <Input
        placeholder={SEARCH_PLACEHOLDER}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          "h-8 w-[260px] pl-8 bg-[#101113] border-[#1a1b1e] text-white placeholder:text-white/40",
          "focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-colors"
        )}
        aria-label="Search projects, domains, and founders"
      />
    </form>
  )
}

function NotificationButton() {
  const { notifications, isLoading } = useNotifications()

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-8 w-8 text-white/80 hover:text-white relative"
      aria-label={`Notifications ${notifications.unread > 0 ? `(${notifications.unread} unread)` : ''}`}
      disabled={isLoading}
    >
      <Bell className="h-4 w-4" />
      {notifications.unread > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
        >
          {notifications.unread > 99 ? '99+' : notifications.unread}
        </Badge>
      )}
      <span className="sr-only">Notifications</span>
    </Button>
  )
}

function UserAvatar() {
  const { profile, isLoading } = useUserProfile()

  if (isLoading) {
    return (
      <div className="h-8 w-8 rounded-md ring-1 ring-[#1a1b1e] bg-[#101113] animate-pulse" />
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-md ring-1 ring-[#1a1b1e] bg-[#101113] hover:bg-[#1a1b1e] transition-colors"
      aria-label={profile ? `User profile for ${profile.name}` : 'User profile'}
    >
      {profile?.avatar ? (
        <img 
          src={profile.avatar} 
          alt={profile.name}
          className="h-6 w-6 rounded-sm"
        />
      ) : (
        <User className="h-4 w-4 text-white/60" />
      )}
    </Button>
  )
}

function NewAllocationButton({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = useCallback(async () => {
    setIsLoading(true)
    try {
      await fetch('/api/analytics/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'new_allocation_clicked',
          timestamp: new Date().toISOString()
        }),
      }).catch(() => {}) 

      router.push('/investor/allocations/new')
    } catch (err) {
      console.error('Navigation error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  return (
    <Button
      size="sm"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "h-8 rounded-md bg-white text-[#0b0b0c] hover:bg-white/90",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.10)_inset]",
        "transition-all duration-200",
        isLoading && "opacity-50",
        className
      )}
    >
      <Plus className="mr-2 h-4 w-4" />
      {isLoading ? 'Creating...' : 'New allocation'}
    </Button>
  )
}

function HeaderSkeleton() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-[#1a1b1e] px-4 bg-[#0a0a0c] py-10">
      <div className="w-4 h-4 bg-[#1a1b1e] rounded animate-pulse" />
      <Separator orientation="vertical" className="mr-2 h-5 bg-[#1a1b1e]" />
      <div className="flex items-center gap-2">
        <div className="w-20 h-4 bg-[#1a1b1e] rounded animate-pulse" />
        <span className="text-white/40">/</span>
        <div className="w-16 h-4 bg-[#1a1b1e] rounded animate-pulse" />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="w-[260px] h-8 bg-[#1a1b1e] rounded animate-pulse hidden md:block" />
        <div className="w-24 h-8 bg-[#1a1b1e] rounded animate-pulse" />
        <div className="w-8 h-8 bg-[#1a1b1e] rounded animate-pulse" />
        <div className="w-8 h-8 bg-[#1a1b1e] rounded animate-pulse" />
      </div>
    </header>
  )
}

export default function InvestorLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const pathname = usePathname()
  
  const section = useMemo(() => {
    if (!pathname) return "Overview"
    const segments = pathname.split("/").filter(Boolean)
    const seg = segments[1]
    return SECTION_MAP[seg] ?? "Overview"
  }, [pathname])


  return (
    <div className="min-h-screen" style={{ backgroundColor: THEME_COLORS.background }}>
      <SidebarProvider>
        {/* Sidebar */}
        <AppInvestorSidebar />
        
        {/* Main content */}
        <SidebarInset 
          className="bg-[#0a0a0c] text-white"
          style={{ backgroundColor: THEME_COLORS.background }}
        >
          <Suspense fallback={<HeaderSkeleton />}>
            <header 
              className={cn(
                "flex h-14 shrink-0 items-center gap-2 px-4 py-10",
                "border-b border-[#1a1b1e] bg-[#0a0a0c]"
              )}
            >
              <SidebarTrigger className="-ml-1 text-white/80 hover:text-white transition-colors" />
              <Separator 
                orientation="vertical" 
                className="mr-2 h-5 bg-[#1a1b1e]" 
              />
              
              <HeaderNavigation section={section} />
              
              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <SearchInput />
                <NewAllocationButton />
                <NotificationButton />
                <UserAvatar />
              </div>
            </header>
          </Suspense>
          
          <main className="flex-1 p-6 sm:p-8 lg:p-10 bg-[#0a0a0c]">
            <Suspense 
              fallback={
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white" />
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}