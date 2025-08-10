import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Search, SlidersHorizontal, ArrowRight, Sparkles } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      {/* Greeting */}
      <section className="rounded-xl bg-[#101113] border border-[#1a1b1e] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-sm text-white/70">Quiet workspace. Curated signals. You know the drill.</p>
          </div>
          <Sparkles className="hidden sm:block h-5 w-5 text-white/40" />
        </div>

        <Separator className="my-4 bg-white/5" />

        {/* Calm CTA row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="h-9 rounded-md bg-white text-[#0b0b0c] hover:bg-white/90">
            <Link href="/investor/search">
              <Search className="mr-2 h-4 w-4" />
              Discover
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-9 rounded-md border-white/10 text-white hover:bg-white/[0.06] bg-transparent"
            title="Open Search with advanced filters"
          >
            <Link href="/investor/search?filters=1">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Advanced filters
            </Link>
          </Button>
        </div>
      </section>

      {/* Snapshot (calm, minimal) */}
      <section className="rounded-xl bg-[#101113] border border-[#1a1b1e] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-medium">Snapshot</h2>
          <Button
            asChild
            variant="outline"
            className="h-8 rounded-md border-white/10 text-white hover:bg-white/[0.06] bg-transparent"
          >
            <Link href="/investor/investments">
              View investments
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-white/5 bg-white/[0.03] p-4">
            <div className="text-xs text-white/60">Active opportunities</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">12</div>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.03] p-4">
            <div className="text-xs text-white/60">Pending NDA/escrow</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">5</div>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.03] p-4">
            <div className="text-xs text-white/60">Messages unread</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">3</div>
          </div>
        </div>
      </section>

      {/* Recent activity (light separators, no heavy grid) */}
      <section className="rounded-xl bg-[#101113] border border-[#1a1b1e]">
        <div className="px-5 sm:px-6 py-4">
          <h2 className="text-base font-medium">Recent activity</h2>
        </div>
        <div className="divide-y divide-white/5">
          <Row
            title="Edge Vision Kit"
            desc="Uploaded revised deck and updated milestones."
            href="/investor/search/p1"
          />
          <Row title="Neurotech IDE" desc="Requested escrow release for Milestone 1." href="/investor/search/p4" />
          <Row title="DePIN Sensor Mesh" desc="New contributor receipts verified." href="/investor/search/p5" />
        </div>
      </section>
    </div>
  )
}

function Row({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <div className="px-5 sm:px-6 py-4 hover:bg-white/[0.03] transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="min-w-0">
          <div className="font-medium">{title}</div>
          <div className="text-sm text-white/70">{desc}</div>
        </div>
        <div className="sm:ml-auto">
          <Button asChild className="h-8 rounded-md bg-white text-[#0b0b0c] hover:bg-white/90">
            <Link href={href}>Open</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
