import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Users, Coins, MessageSquareText } from "lucide-react"

export default function FounderOverviewPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Welcome */}
      <div className="rounded-lg border border-[#1a1b1e] bg-[#101113] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div>
            <div className="text-sm text-white/60">Welcome back</div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Founder overview</h1>
            <p className="text-white/70 text-sm mt-1">Your ideas, team, and funding in one clean workspace.</p>
          </div>
          <div className="sm:ml-auto flex items-center gap-2">
            <Button className="rounded-md bg-white text-[#0b0b0c] hover:bg-white/90">
              <Lightbulb className="mr-2 h-4 w-4" />
              Post idea
            </Button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi title="Active ideas" value="3" icon={Lightbulb} />
        <Kpi title="Team members" value="2" icon={Users} />
        <Kpi title="Funds raised" value="$12,400" icon={Coins} />
        <Kpi title="Unread chats" value="7" icon={MessageSquareText} />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active ideas */}
        <Card className="bg-[#101113] border-[#1a1b1e] lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Your ideas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <IdeaCard
              title="Edge Vision Kit"
              status="Funded"
              funding="$8,000 raised"
              stage="Building MVP"
              tags={["Edge AI", "Robotics"]}
            />
            <IdeaCard
              title="Local‑first Creator Analytics"
              status="Seeking"
              funding="$4,400 / $12,000"
              stage="Prototype ready"
              tags={["Creator infra", "Privacy"]}
            />
            <IdeaCard
              title="Climate Hardware Sensors"
              status="Draft"
              funding="Not posted"
              stage="Concept phase"
              tags={["Climate hardware"]}
            />
          </CardContent>
        </Card>

        {/* Team & activity */}
        <div className="space-y-6">
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#0f1012] grid place-items-center text-xs font-medium">You</div>
                <div>
                  <div className="text-sm font-medium">Alex Chen</div>
                  <div className="text-xs text-white/60">Founder</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#0f1012] grid place-items-center text-xs font-medium">JD</div>
                <div>
                  <div className="text-sm font-medium">Jordan Davis</div>
                  <div className="text-xs text-white/60">Co‑founder, Tech</div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full h-8 mt-2 border-[#1a1b1e] text-white hover:bg-white/[0.06] bg-transparent"
              >
                Invite team member
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recent activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                  <div>
                    <div>Milestone #2 completed • Edge Vision Kit</div>
                    <div className="text-white/50 text-xs">2h ago</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                  <div>
                    <div>New investor message • Creator Analytics</div>
                    <div className="text-white/50 text-xs">1d ago</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                  <div>
                    <div>Funds released • $4,000</div>
                    <div className="text-white/50 text-xs">3d ago</div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Kpi({ title, value, icon: Icon }: { title: string; value: string; icon: any }) {
  return (
    <div className="rounded-lg border border-[#1a1b1e] bg-[#101113] p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-white/60" />
        <div className="text-xs text-white/60">{title}</div>
      </div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  )
}

function IdeaCard({
  title,
  status,
  funding,
  stage,
  tags,
}: {
  title: string
  status: string
  funding: string
  stage: string
  tags: string[]
}) {
  const statusColor =
    status === "Funded" ? "text-emerald-300" : status === "Seeking" ? "text-yellow-300" : "text-white/60"

  return (
    <div className="rounded-lg border border-[#1a1b1e] bg-[#0f1012] p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="font-medium">{title}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs ${statusColor}`}>{status}</span>
            <span className="text-xs text-white/60">• {funding}</span>
          </div>
          <div className="text-xs text-white/60 mt-1">{stage}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/[0.04] text-white border-white/10 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <Button variant="outline" className="h-8 border-[#1a1b1e] text-white hover:bg-white/[0.06] bg-transparent">
          View
        </Button>
      </div>
    </div>
  )
}
