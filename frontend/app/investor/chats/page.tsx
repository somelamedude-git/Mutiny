"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Send, ChevronLeft, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

type Category = "all" | "co" | "requests" | "general"

type Thread = {
  id: string
  name: string
  preview: string
  unread: number
  category: Exclude<Category, "all">
  participants: string[]
}

type Message = { from: "you" | "them"; text: string; when: string }

const THREADS: Thread[] = [
  {
    id: "t1",
    name: "Edge Vision Kit • Co‑investors",
    preview: "We’ll share Milestone #2 receipts today.",
    unread: 2,
    category: "co",
    participants: ["You", "Naya", "Rohit", "Ari"],
  },
  {
    id: "t2",
    name: "Climate Hardware v1 • Co‑investors",
    preview: "Intro’d a manufacturing advisor for BOM sanity.",
    unread: 0,
    category: "co",
    participants: ["You", "Mei", "Jon"],
  },
  {
    id: "t3",
    name: "Local‑first Creator Analytics • Requests",
    preview: "Requesting release for Milestone #2; receipts attached.",
    unread: 1,
    category: "requests",
    participants: ["Founders", "You"],
  },
  {
    id: "t4",
    name: "Robotics Firmware Co‑pilot • Requests",
    preview: "NDA draft ready for your review.",
    unread: 0,
    category: "requests",
    participants: ["Founders", "You"],
  },
  {
    id: "t5",
    name: "Ops • General",
    preview: "July billing statement is ready.",
    unread: 0,
    category: "general",
    participants: ["Ops", "You"],
  },
  {
    id: "t6",
    name: "Neurotech IDE PM • General",
    preview: "Prototype video attached—keen on feedback.",
    unread: 1,
    category: "general",
    participants: ["PM", "You"],
  },
]

const SEED_MESSAGES: Record<string, Message[]> = {
  t1: [
    { from: "them", text: "We’ll share Milestone #2 receipts today.", when: "2h" },
    { from: "you", text: "Great—thank you. I’ll review this evening.", when: "1h" },
  ],
  t2: [
    { from: "them", text: "Intro’d a manufacturing advisor for BOM sanity.", when: "1d" },
    { from: "you", text: "Perfect—please loop me into that thread.", when: "22h" },
  ],
  t3: [
    { from: "them", text: "Requesting release for Milestone #2; receipts attached.", when: "3h" },
    { from: "you", text: "Received—reviewing now.", when: "2h" },
  ],
  t4: [
    { from: "them", text: "NDA draft ready for your review.", when: "1d" },
    { from: "you", text: "Send the link—will sign today.", when: "20h" },
  ],
  t5: [{ from: "them", text: "July billing statement is ready.", when: "2d" }],
  t6: [{ from: "them", text: "Prototype video attached—keen on feedback.", when: "3d" }],
}

function initials(label: string) {
  const words = label.replace(/•.*/g, "").trim().split(/\s+/)
  const first = words[0]?.[0] ?? "M"
  const last = words[1]?.[0] ?? ""
  return (first + last).toUpperCase()
}

export default function InvestorChatsPage() {
  const [category, setCategory] = useState<Category>("all")
  const [query, setQuery] = useState("")
  const [activeId, setActiveId] = useState<string | null>(null)
  const [text, setText] = useState("")
  const [messagesByThread, setMessagesByThread] = useState<Record<string, Message[]>>(
    () => JSON.parse(JSON.stringify(SEED_MESSAGES)) as Record<string, Message[]>,
  )

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

  const activeThread = filtered.find((t) => t.id === activeId) ?? THREADS.find((t) => t.id === activeId) ?? null
  const msgs = activeThread ? (messagesByThread[activeThread.id] ?? []) : []

  const listRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [activeId, msgs.length])

  const showOnlyListOnMobile = !activeThread
  const showOnlyChatOnMobile = !!activeThread

  function onSend(e: React.FormEvent) {
    e.preventDefault()
    if (!activeThread || text.trim().length === 0) return
    const newMsg: Message = { from: "you", text: text.trim(), when: "now" }
    setMessagesByThread((prev) => {
      const next = { ...prev }
      next[activeThread.id] = [...(next[activeThread.id] ?? []), newMsg]
      return next
    })
    setText("")
    setTimeout(() => {
      setMessagesByThread((prev) => {
        const next = { ...prev }
        next[activeThread.id] = [
          ...(next[activeThread.id] ?? []),
          { from: "them", text: "Got it — will reply shortly.", when: "now" },
        ]
        return next
      })
    }, 1200)
  }

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      {/* Two-pane only where needed */}
      <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] gap-4 lg:gap-6">
        {/* Threads list: soft, no dividers */}
        <section className={cn("lg:block", showOnlyChatOnMobile ? "hidden" : "block")}>
          <div className="rounded-xl bg-[#101113] p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-9 w-full pl-8 bg-[#0f1012] border-transparent text-white placeholder:text-white/40"
                />
              </div>
              <label htmlFor="category" className="sr-only">
                Filter
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="h-9 rounded-md bg-[#0f1012] border-transparent px-2 text-sm text-white"
                aria-label="Filter"
              >
                <option value="all">All</option>
                <option value="co">Co‑investors</option>
                <option value="requests">Requests</option>
                <option value="general">General</option>
              </select>
            </div>

            <ul className="mt-3 space-y-1.5">
              {filtered.length === 0 && <li className="p-4 text-sm text-white/60">No conversations found.</li>}
              {filtered.map((t) => {
                const active = t.id === activeId
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => setActiveId(t.id)}
                      className={cn(
                        "w-full rounded-lg px-3 py-2.5 text-left transition-colors",
                        active ? "bg-white/[0.05]" : "hover:bg-white/[0.03]",
                      )}
                      aria-pressed={active}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          aria-hidden="true"
                          className="grid size-9 place-items-center rounded-full bg-[#0f1012] text-xs font-medium"
                        >
                          {initials(t.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-medium">{t.name}</span>
                            {t.unread > 0 && (
                              <span className="inline-block h-2.5 w-2.5 rounded-full bg-white/70" aria-label="Unread" />
                            )}
                          </div>
                          <div className="truncate text-xs text-white/60">{t.preview}</div>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* Conversation: soft header, no hard borders */}
        <section className={cn("lg:block", showOnlyListOnMobile ? "hidden" : "block")}>
          <div className="rounded-xl bg-[#101113] overflow-hidden">
            <div className="flex h-12 items-center gap-2 px-2 sm:px-3">
              <button
                className="lg:hidden inline-flex size-8 items-center justify-center rounded-md hover:bg-white/[0.06]"
                onClick={() => {
                  ;(document.activeElement as HTMLElement | null)?.blur()
                  setActiveId(null)
                }}
                aria-label="Back"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {activeThread ? (
                <>
                  <div
                    aria-hidden="true"
                    className="grid size-8 place-items-center rounded-full bg-[#0f1012] text-xs font-medium"
                  >
                    {initials(activeThread.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium leading-tight">{activeThread.name}</div>
                    <div className="text-[11px] text-white/50 leading-tight">Active now</div>
                  </div>
                  <button
                    className="inline-flex size-8 items-center justify-center rounded-md hover:bg-white/[0.06]"
                    aria-label="More"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <div className="px-2 text-sm text-white/70">Select a conversation</div>
              )}
            </div>

            <div ref={listRef} className="flex h-[58vh] min-h-[380px] flex-col gap-6 overflow-y-auto px-3 py-4 sm:px-4">
              {!activeThread && (
                <div className="grid h-full place-items-center text-sm text-white/60">
                  Choose a thread to view messages.
                </div>
              )}
              {activeThread &&
                msgs.map((m, i) => {
                  const isYou = m.from === "you"
                  return (
                    <div key={i} className={cn("flex w-full", isYou ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[78%] rounded-2xl px-3 py-2 text-sm",
                          isYou ? "bg-white text-[#0b0b0c]" : "bg-[#1a1b1e] text-white",
                        )}
                      >
                        <div>{m.text}</div>
                        <div className={cn("mt-1 text-[10px]", isYou ? "text-[#0b0b0c]/70" : "text-white/60")}>
                          {m.when}
                        </div>
                      </div>
                    </div>
                  )
                })}
              {activeThread && msgs.length > 0 && <div className="mt-1 text-right text-[11px] text-white/40">Seen</div>}
            </div>

            <form onSubmit={onSend} className="flex items-center gap-2 px-2 py-2 sm:px-3">
              <label htmlFor="composer" className="sr-only">
                Message
              </label>
              <Input
                id="composer"
                placeholder={activeThread ? "Message..." : "Select a conversation to start messaging…"}
                disabled={!activeThread}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="h-10 flex-1 rounded-full bg-[#0f1012] border-transparent text-white placeholder:text-white/40"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!activeThread || text.trim().length === 0}
                className="size-10 rounded-full bg-white text-[#0b0b0c] hover:bg-white/90"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
