import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ConciergeRail } from "@/components/concierge-rail"
import { Search, ArrowUpRight } from "lucide-react"

export default function InvestorOverviewPage() {
  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="flex gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1 space-y-6">
          <PageHeader />

          {/* KPIs minimal */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Kpi title="Available balance" value="$128,400" />
            <Kpi title="Committed capital" value="$86,200" />
            <Kpi title="Active projects" value="9" />
            <Kpi title="Unread chats" value="5" />
          </div>

          {/* Notion-like blocks */}
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="bg-[#101113] border-[#1a1b1e] lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Column title="Assess" items={["Local‑first notes app", "DePIN sensor mesh", "Neurotech IDE"]} />
                  <Column title="Match" items={["Edge AI vision kit", "Climate hardware v1"]} />
                  <Column title="Mobilize" items={["Creator infra sync", "Robotics firmware co‑pilot"]} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#101113] border-[#1a1b1e]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Discover</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    aria-label="Discover input"
                    placeholder="Search domains, founders…"
                    className="h-9 w-full rounded-md bg-[#0f1012] border border-[#1a1b1e] pl-8 pr-2 text-sm outline-none placeholder:text-white/40"
                  />
                </div>
                <div className="flex gap-2">
                  {["Climate", "Edge AI", "Local‑first"].map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-md border border-[#1a1b1e] bg-[#0f1012] px-2 py-1 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Button className="mt-1 w-full bg-white text-[#0b0b0c] hover:bg-white/90">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Advanced filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Activity */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recent activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {[
                  { t: "Milestone #2 accepted • Edge AI vision kit", when: "2h ago" },
                  { t: "New project suggested in Climate • Hardware founders", when: "1d ago" },
                  { t: "Funds released • $4,000 to Engineering", when: "3d ago" },
                  { t: "Signed mutual NDA • Neurotech IDE", when: "5d ago" },
                ].map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                    <div>
                      <div>{a.t}</div>
                      <div className="text-white/50 text-xs">{a.when}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Concierge rail */}
        <ConciergeRail />
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <div className="rounded-lg border border-[#1a1b1e] bg-[#101113] p-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div>
          <div className="text-sm text-white/60">Welcome back</div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Investor overview</h1>
          <p className="text-white/70 text-sm mt-1">
            Clean, minimal, precise. Your capital and conversations at a glance.
          </p>
        </div>
        <div className="sm:ml-auto flex items-center gap-2">
          <Button className="rounded-md bg-white text-[#0b0b0c] hover:bg-white/90">
            <Search className="mr-2 h-4 w-4" />
            Discover
          </Button>
        </div>
      </div>
    </div>
  )
}

function Kpi({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#1a1b1e] bg-[#101113] p-4">
      <div className="text-xs text-white/60">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  )
}

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-[#1a1b1e] bg-[#0f1012] p-3">
      <div className="text-xs uppercase tracking-[0.2em] text-white/50">{title}</div>
      <ul className="mt-2 space-y-2">
        {items.map((it) => (
          <li key={it} className="rounded-md border border-[#1a1b1e] bg-[#101113] px-3 py-2">
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}
