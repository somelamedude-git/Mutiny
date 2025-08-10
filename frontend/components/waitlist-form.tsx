"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const valid = /.+@.+/.test(email)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    await new Promise((r) => setTimeout(r, 500))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200"
      >
        You&apos;re on the list. We&apos;ll reach out soon.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <Input
        id="email"
        type="email"
        placeholder="you@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-full bg-black/30 border-white/15 text-white placeholder:text-white/40"
        required
      />
      <Button type="submit" disabled={!valid} className="rounded-full bg-white text-black hover:bg-[#e3c27a]">
        Join
      </Button>
    </form>
  )
}
