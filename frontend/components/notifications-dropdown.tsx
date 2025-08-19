"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, MessageSquare, TrendingUp, Lightbulb, Users, Settings, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "message" | "investment" | "idea" | "team" | "system"
  title: string
  description: string
  time: string
  isRead: boolean
  actionUrl: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New message from Alex Chen",
    description: "Interested in your Edge Vision Kit project",
    time: "2m ago",
    isRead: false,
    actionUrl: "/founder/chats",
  },
  {
    id: "2",
    type: "investment",
    title: "Funding milestone reached",
    description: "Your Climate Sensors project hit $5,000",
    time: "1h ago",
    isRead: false,
    actionUrl: "/founder/funding",
  },
  {
    id: "3",
    type: "idea",
    title: "Someone liked your idea",
    description: "Local-first Creator Analytics got 3 new likes",
    time: "3h ago",
    isRead: true,
    actionUrl: "/founder/ideas",
  },
  {
    id: "4",
    type: "team",
    title: "Team invitation",
    description: "Riley M. wants to collaborate on DePIN project",
    time: "5h ago",
    isRead: false,
    actionUrl: "/founder/chats",
  },
  {
    id: "5",
    type: "system",
    title: "Profile verification complete",
    description: "Your founder profile has been verified",
    time: "1d ago",
    isRead: true,
    actionUrl: "/founder/profile",
  },
]

const notificationIcons = {
  message: MessageSquare,
  investment: TrendingUp,
  idea: Lightbulb,
  team: Users,
  system: Settings,
}

const notificationColors = {
  message: "text-blue-400",
  investment: "text-green-400",
  idea: "text-yellow-400",
  team: "text-purple-400",
  system: "text-gray-400",
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const router = useRouter()

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)))
    // Navigate to the relevant page
    router.push(notification.actionUrl)
  }

  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const handleRemoveNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-[#101113] border-[#1a1b1e] text-white">
        <div className="flex items-center justify-between p-3 border-b border-[#1a1b1e]">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-xs text-white/60 hover:text-white"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-white/60">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = notificationIcons[notification.type]
              const iconColor = notificationColors[notification.type]

              return (
                <DropdownMenuItem
                  key={notification.id}
                  className="p-0 focus:bg-white/[0.06]"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3 p-3 w-full cursor-pointer">
                    <div className="relative">
                      <Icon className={cn("h-4 w-4 mt-0.5", iconColor)} />
                      {!notification.isRead && (
                        <div className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">{notification.title}</p>
                      <p className="text-xs text-white/60 mt-1 line-clamp-2">{notification.description}</p>
                      <p className="text-xs text-white/40 mt-1">{notification.time}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleMarkAsRead(notification.id, e)}
                          className="h-6 w-6 text-white/40 hover:text-white"
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleRemoveNotification(notification.id, e)}
                        className="h-6 w-6 text-white/40 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </DropdownMenuItem>
              )
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
