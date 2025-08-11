"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Infinity } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import axios from "axios"
import { useRouter } from "next/navigation" // ✅ Next.js way

export function NavAvant() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleEarlyAccess = async () => {
    try {
      const res = await axios.post("#", { email: "test@example.com" })
      console.log("POST success:", res.data)

      router.push("/waitlist") // ✅ Next.js navigation
    } catch (error) {
      console.error("POST failed:", error)
    }
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mt-4 mb-3 flex items-center justify-between rounded-full border border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30 px-3 py-2">
          <Link href="#" className="flex items-center gap-2" aria-label="Mutiny home">
            <div className="relative h-8 w-8">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 210deg, #e3c27a, #34d399 35%, #f472b6 60%, #e3c27a 100%)",
                  filter: "blur(6px)",
                  opacity: 0.6,
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-white/30 bg-black/60" />
              <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-white/10 to-black/60" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-semibold tracking-[0.04em]">Mutiny</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">{"Mut • Iny"}</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#match" className="text-sm text-white/80 hover:text-white transition-colors">
              Align
            </a>
            <a href="#duo" className="text-sm text-white/80 hover:text-white transition-colors">
              Duo
            </a>
            <a href="#funding" className="text-sm text-white/80 hover:text-white transition-colors">
              Funding
            </a>
            <Button
              onClick={handleEarlyAccess}
              className={cn(
                "rounded-full bg-white text-black hover:bg-[#e3c27a] hover:text-black",
                "shadow-[0_0_0_1px_rgba(255,255,255,0.16)_inset,0_12px_50px_rgba(227,194,122,0.24)]",
              )}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Early access
            </Button>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30"
          >
            <Infinity className="h-4 w-4" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-4 grid gap-3">
            <a href="#match" className="text-sm text-white/90">
              Align
            </a>
            <a href="#duo" className="text-sm text-white/90">
              Duo
            </a>
            <a href="#funding" className="text-sm text-white/90">
              Funding
            </a>
            <Button
              onClick={handleEarlyAccess}
              className="w-full rounded-full bg-white text-black hover:bg-[#e3c27a]"
            >
              Early access
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
