"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Send, ChevronLeft, MoreHorizontal, Users, Clock, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"

type Category = "all" | "co" | "requests" | "general"

type Thread = {
  id: string
  name: string
  preview: string
  unread: number
  category: Exclude<Category, "all">
  participants: string[]
  lastActive: string
  isOnline?: boolean
}

type Message = { 
  id: string
  from: "you" | "them"
  text: string
  when: string
  timestamp: number
  delivered?: boolean
  seen?: boolean
}

const THREADS: Thread[] = [
  {
    id: "t1",
    name: "Edge Vision Kit • Co‑investors",
    preview: "We'll share Milestone #2 receipts today.",
    unread: 2,
    category: "co",
    participants: ["You", "Naya", "Rohit", "Ari"],
    lastActive: "2h",
    isOnline: true,
  },
  {
    id: "t2",
    name: "Climate Hardware v1 • Co‑investors",
    preview: "Intro'd a manufacturing advisor for BOM sanity.",
    unread: 0,
    category: "co",
    participants: ["You", "Mei", "Jon"],
    lastActive: "1d",
    isOnline: false,
  },
  {
    id: "t3",
    name: "Local‑first Creator Analytics • Requests",
    preview: "Requesting release for Milestone #2; receipts attached.",
    unread: 1,
    category: "requests",
    participants: ["Founders", "You"],
    lastActive: "3h",
    isOnline: true,
  },
  {
    id: "t4",
    name: "Robotics Firmware Co‑pilot • Requests",
    preview: "NDA draft ready for your review.",
    unread: 0,
    category: "requests",
    participants: ["Founders", "You"],
    lastActive: "1d",
    isOnline: false,
  },
  {
    id: "t5",
    name: "Ops • General",
    preview: "July billing statement is ready.",
    unread: 0,
    category: "general",
    participants: ["Ops", "You"],
    lastActive: "2d",
    isOnline: false,
  },
  {
    id: "t6",
    name: "Neurotech IDE PM • General",
    preview: "Prototype video attached—keen on feedback.",
    unread: 1,
    category: "general",
    participants: ["PM", "You"],
    lastActive: "3d",
    isOnline: true,
  },
]

const SEED_MESSAGES: Record<string, Message[]> = {
  t1: [
    { id: "m1", from: "them", text: "We'll share Milestone #2 receipts today.", when: "2h", timestamp: Date.now() - 7200000, delivered: true, seen: true },
    { id: "m2", from: "you", text: "Great—thank you. I'll review this evening.", when: "1h", timestamp: Date.now() - 3600000, delivered: true, seen: false },
  ],
  t2: [
    { id: "m3", from: "them", text: "Intro'd a manufacturing advisor for BOM sanity.", when: "1d", timestamp: Date.now() - 86400000, delivered: true, seen: true },
    { id: "m4", from: "you", text: "Perfect—please loop me into that thread.", when: "22h", timestamp: Date.now() - 79200000, delivered: true, seen: true },
  ],
  t3: [
    { id: "m5", from: "them", text: "Requesting release for Milestone #2; receipts attached.", when: "3h", timestamp: Date.now() - 10800000, delivered: true, seen: true },
    { id: "m6", from: "you", text: "Received—reviewing now.", when: "2h", timestamp: Date.now() - 7200000, delivered: true, seen: false },
  ],
  t4: [
    { id: "m7", from: "them", text: "NDA draft ready for your review.", when: "1d", timestamp: Date.now() - 86400000, delivered: true, seen: true },
    { id: "m8", from: "you", text: "Send the link—will sign today.", when: "20h", timestamp: Date.now() - 72000000, delivered: true, seen: true },
  ],
  t5: [{ id: "m9", from: "them", text: "July billing statement is ready.", when: "2d", timestamp: Date.now() - 172800000, delivered: true, seen: true }],
  t6: [{ id: "m10", from: "them", text: "Prototype video attached—keen on feedback.", when: "3d", timestamp: Date.now() - 259200000, delivered: true, seen: true }],
}

function initials(label: string) {
  const words = label.replace(/•.*/g, "").trim().split(/\s+/)
  const first = words[0]?.[0] ?? "M"
  const last = words[1]?.[0] ?? ""
  return (first + last).toUpperCase()
}

function formatTime(when: string): string {
  if (when === "now") return "now"
  const match = when.match(/(\d+)([hdm])/)
  if (!match) return when
  
  const [, num, unit] = match
  const number = parseInt(num)
  
  switch (unit) {
    case 'm': return number === 1 ? '1 min' : `${number} mins`
    case 'h': return number === 1 ? '1 hour' : `${number} hours`
    case 'd': return number === 1 ? 'yesterday' : `${number} days ago`
    default: return when
  }
}

export default function InvestorChatsPage() {
  const [category, setCategory] = useState<Category>("all")
  const [query, setQuery] = useState("")
  const [activeId, setActiveId] = useState<string | null>(null)
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messagesByThread, setMessagesByThread] = useState<Record<string, Message[]>>(
    () => JSON.parse(JSON.stringify(SEED_MESSAGES)) as Record<string, Message[]>,
  )
  const [loadedThreads, setLoadedThreads] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const pool =
      category === "all" ? THREADS : THREADS.filter((t) => t.category === (category as Exclude<Category, "all">))
    if (!query.trim()) return pool
    const q = query.toLowerCase()
    return pool.filter((t) => t.name.toLowerCase().includes(q) || t.preview.toLowerCase().includes(q))
  }, [category, query])

  useEffect(() => {
    setActiveId((prev) => {
      if (prev && filtered.some((t) => t.id === prev)) return prev
      return filtered[0]?.id ?? null
    })
  }, [filtered])

  // Lazy load messages when thread is selected
  const loadThread = useCallback((threadId: string) => {
    if (!loadedThreads.has(threadId)) {
      setLoadedThreads(prev => new Set([...prev, threadId]))
      // Simulate loading delay for demonstration
      setTimeout(() => {
        setMessagesByThread(prev => ({
          ...prev,
          [threadId]: prev[threadId] || []
        }))
      }, 100)
    }
  }, [loadedThreads])

  useEffect(() => {
    if (activeId) {
      loadThread(activeId)
    }
  }, [activeId, loadThread])

  const activeThread = filtered.find((t) => t.id === activeId) ?? THREADS.find((t) => t.id === activeId) ?? null
  const msgs = activeThread ? (messagesByThread[activeThread.id] ?? []) : []

  const listRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [activeId, msgs.length])

  // Auto-focus input when thread changes
  useEffect(() => {
    if (activeThread && inputRef.current) {
      inputRef.current.focus()
    }
  }, [activeThread])

  const showOnlyListOnMobile = !activeThread
  const showOnlyChatOnMobile = !!activeThread

  const generateMessageId = () => `m_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  function onSend(e: React.FormEvent) {
    e.preventDefault()
    if (!activeThread || text.trim().length === 0) return
    
    const messageId = generateMessageId()
    const newMsg: Message = { 
      id: messageId,
      from: "you", 
      text: text.trim(), 
      when: "now", 
      timestamp: Date.now(),
      delivered: false,
      seen: false
    }
    
    setMessagesByThread((prev) => {
      const next = { ...prev }
      next[activeThread.id] = [...(next[activeThread.id] ?? []), newMsg]
      return next
    })
    setText("")
    setIsTyping(true)

    // Simulate message delivery
    setTimeout(() => {
      setMessagesByThread((prev) => {
        const next = { ...prev }
        const messages = next[activeThread.id] || []
        const updatedMessages = messages.map(msg => 
          msg.id === messageId ? { ...msg, delivered: true } : msg
        )
        next[activeThread.id] = updatedMessages
        return next
      })
    }, 500)

    // Simulate response
    setTimeout(() => {
      setIsTyping(false)
      const responseId = generateMessageId()
      setMessagesByThread((prev) => {
        const next = { ...prev }
        next[activeThread.id] = [
          ...(next[activeThread.id] ?? []),
          { 
            id: responseId,
            from: "them", 
            text: "Got it — will reply shortly.", 
            when: "now", 
            timestamp: Date.now(),
            delivered: true,
            seen: false
          },
        ]
        return next
      })
      
      // Mark as seen after a short delay
      setTimeout(() => {
        setMessagesByThread((prev) => {
          const next = { ...prev }
          const messages = next[activeThread.id] || []
          const updatedMessages = messages.map(msg => 
            msg.id === messageId ? { ...msg, seen: true } : msg
          )
          next[activeThread.id] = updatedMessages
          return next
        })
      }, 1000)
    }, 1200)
  }

  // Handle typing indicator
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (text.length > 0) {
      timeout = setTimeout(() => setIsTyping(false), 1000)
    }
    return () => clearTimeout(timeout)
  }, [text])

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] gap-4 lg:gap-6">
        {/* Enhanced Threads list */}
        <section className={cn("lg:block", showOnlyChatOnMobile ? "hidden" : "block")}>
          <div className="rounded-xl bg-[#101113] p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input
                  placeholder="Search conversations..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-9 w-full pl-8 bg-[#0f1012] border-transparent text-white placeholder:text-white/40 focus:ring-1 focus:ring-white/20"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="h-9 rounded-md bg-[#0f1012] px-3 text-sm text-white border-transparent focus:ring-1 focus:ring-white/20 cursor-pointer"
                aria-label="Filter conversations"
              >
                <option value="all">All</option>
                <option value="co">Co‑investors</option>
                <option value="requests">Requests</option>
                <option value="general">General</option>
              </select>
            </div>

            <div className="space-y-0.5">
              {filtered.length === 0 && (
                <div className="p-4 text-center">
                  <div className="text-sm text-white/60">No conversations found</div>
                  <div className="text-xs text-white/40 mt-1">Try adjusting your search or filter</div>
                </div>
              )}
              {filtered.map((t) => {
                const active = t.id === activeId
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveId(t.id)}
                    className={cn(
                      "w-full rounded-lg px-3 py-3 text-left transition-all duration-200 group",
                      active 
                        ? "bg-white/[0.08] shadow-sm" 
                        : "hover:bg-white/[0.04] active:bg-white/[0.06]",
                    )}
                    aria-pressed={active}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className={cn(
                            "grid size-10 place-items-center rounded-full text-xs font-medium transition-colors",
                            active ? "bg-white/10" : "bg-[#0f1012] group-hover:bg-white/[0.08]"
                          )}
                        >
                          {initials(t.name)}
                        </div>
                        {t.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-green-400 border-2 border-[#101113]" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={cn(
                            "truncate text-sm font-medium transition-colors",
                            active ? "text-white" : "text-white/90"
                          )}>
                            {t.name}
                          </span>
                          <div className="flex items-center gap-1.5 ml-2">
                            {t.unread > 0 && (
                              <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-medium bg-white/90 text-[#101113] rounded-full">
                                {t.unread > 9 ? '9+' : t.unread}
                              </span>
                            )}
                            <span className="text-[10px] text-white/50 whitespace-nowrap">
                              {formatTime(t.lastActive)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="truncate text-xs text-white/60 flex-1">
                            {t.preview}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Users className="h-3 w-3 text-white/40" />
                          <span className="text-[10px] text-white/40">
                            {t.participants.length} participant{t.participants.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Chat view */}
        <section className={cn("lg:block", showOnlyListOnMobile ? "hidden" : "block")}>
          <div className="rounded-xl bg-[#101113] overflow-hidden flex flex-col h-[600px] lg:h-[700px]">
            {/* Enhanced header */}
            <div className="flex h-14 items-center gap-3 px-3 sm:px-4 border-b border-white/[0.06]">
              <button
                className="lg:hidden inline-flex size-8 items-center justify-center rounded-md hover:bg-white/[0.06] transition-colors"
                onClick={() => setActiveId(null)}
                aria-label="Back to conversations"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {activeThread ? (
                <>
                  <div className="relative">
                    <div className="grid size-9 place-items-center rounded-full bg-[#0f1012] text-xs font-medium">
                      {initials(activeThread.name)}
                    </div>
                    {activeThread.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-green-400 border border-[#101113]" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium leading-tight">{activeThread.name}</div>
                    <div className="flex items-center gap-1 text-[11px] text-white/50 leading-tight">
                      {activeThread.isOnline ? (
                        <>
                          <div className="size-1.5 rounded-full bg-green-400" />
                          <span>Active now</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3" />
                          <span>Last seen {formatTime(activeThread.lastActive)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    className="inline-flex size-8 items-center justify-center rounded-md hover:bg-white/[0.06] transition-colors"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <div className="px-2 text-sm text-white/70">Select a conversation</div>
              )}
            </div>

            {/* Enhanced messages area */}
            <div 
              ref={listRef} 
              className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 space-y-4 scroll-smooth"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}
            >
              {!activeThread && (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <div className="text-sm text-white/60 mb-2">Choose a conversation to start</div>
                    <div className="text-xs text-white/40">Select from {THREADS.length} available conversations</div>
                  </div>
                </div>
              )}
              {activeThread && !loadedThreads.has(activeThread.id) && (
                <div className="grid h-full place-items-center">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <div className="animate-spin size-4 border-2 border-white/20 border-t-white/60 rounded-full" />
                    Loading messages...
                  </div>
                </div>
              )}
              {activeThread && loadedThreads.has(activeThread.id) && msgs.map((m, i) => {
                const isYou = m.from === "you"
                const showDeliveryStatus = isYou && i === msgs.length - 1
                return (
                  <div key={m.id} className={cn("flex w-full", isYou ? "justify-end" : "justify-start")}>
                    <div className="max-w-[85%] sm:max-w-[78%]">
                      <div
                        className={cn(
                          "rounded-2xl px-3 py-2.5 text-sm shadow-sm",
                          isYou 
                            ? "bg-white text-[#0b0b0c] rounded-br-md" 
                            : "bg-[#1a1b1e] text-white rounded-bl-md",
                        )}
                      >
                        <div className="whitespace-pre-wrap break-words">{m.text}</div>
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 mt-1 text-[10px]",
                        isYou ? "justify-end text-white/50" : "text-white/50"
                      )}>
                        <span>{formatTime(m.when)}</span>
                        {showDeliveryStatus && (
                          <div className="flex items-center gap-0.5">
                            {m.seen ? (
                              <CheckCheck className="h-3 w-3 text-blue-400" />
                            ) : m.delivered ? (
                              <CheckCheck className="h-3 w-3 text-white/40" />
                            ) : (
                              <Clock className="h-3 w-3 text-white/30" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              
              {/* Typing indicator */}
              {isTyping && activeThread && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1b1e] rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced input area */}
            <div className="flex items-end gap-2 p-3 border-t border-white/[0.06]">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  placeholder={activeThread ? "Type a message..." : "Select a conversation to start messaging"}
                  disabled={!activeThread}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full min-h-[40px] max-h-[120px] h-[40px] py-2.5 px-3 pr-12 rounded-2xl bg-[#0f1012] border border-transparent text-white placeholder:text-white/40 focus:ring-1 focus:ring-white/20 focus:outline-none resize-none overflow-y-auto text-sm leading-5"
                  rows={1}
                  style={{
                    height: Math.min(120, Math.max(40, (text.split('\n').length * 20) + 20))
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      onSend(e)
                    }
                  }}
                />
                {text.length > 0 && (
                  <div className="absolute right-3 bottom-2 text-[10px] text-white/40">
                    {text.length}/1000
                  </div>
                )}
              </div>
              <Button
                onClick={onSend}
                size="icon"
                disabled={!activeThread || text.trim().length === 0}
                className={cn(
                  "size-10 rounded-full transition-all duration-200 flex-shrink-0",
                  text.trim().length > 0
                    ? "bg-white text-[#0b0b0c] hover:bg-white/90 shadow-lg"
                    : "bg-white/20 text-white/60 cursor-not-allowed"
                )}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}