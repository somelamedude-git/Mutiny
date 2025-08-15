"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Infinity } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import axios from "axios"
import { useRouter } from "next/navigation" // ✅ Next.js way
import { WaveLogo } from "./mutiny-logo"

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
       <WaveLogo/>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link scroll={false} href="#match" className="text-sm text-white/80 hover:text-white transition-colors">
              Align
            </Link>
            <Link scroll={false} href="#duo" className="text-sm text-white/80 hover:text-white transition-colors">
              Duo
            </Link>
            <Link scroll={false} href="#funding" className="text-sm text-white/80 hover:text-white transition-colors">
              Funding
            </Link>
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
            <Link scroll={false} href="#match" className="text-sm text-white/90">
              Align
            </Link>
            <Link scroll={false}  href="#duo" className="text-sm text-white/90">
              Duo
            </Link>
            <Link scroll={false}  href="#funding" className="text-sm text-white/90">
              Funding
            </Link>
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