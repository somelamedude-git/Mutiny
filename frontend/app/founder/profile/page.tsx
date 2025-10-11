"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Building2, Link2, ShieldCheck, Tag, UserRound, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

// Reuse components from investor profile
import { VerificationBadge } from "@/components/verification-badge"
import { TrustInspector } from "@/components/trust-inspector"
import { AvatarUploader } from "@/components/avatar-uploader"

const SKILLS = ["Hardware", "Software", "AI/ML", "Design", "Marketing", "Operations", "Finance", "Legal"]
const INTERESTS = [
  "Climate hardware",
  "Edge AI",
  "Local‑first",
  "Robotics",
  "Bio tooling",
  "Privacy",
  "DePIN",
  "Creator infra",
]

export default function FounderProfilePage() {
  // Basic info
  const [name, setName] = useState("Alex Chen")
  const [role, setRole] = useState("Founder & CEO")
  const [company, setCompany] = useState("Edge Vision Labs")
  const [location, setLocation] = useState("San Francisco, CA")
  const [bio, setBio] = useState(
    "Building the future of edge AI with privacy-first computer vision. Previously led hardware teams at two successful startups.",
  )
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  // Skills and interests
  const [skills, setSkills] = useState<string[]>(["Hardware", "AI/ML", "Operations"])
  const [interests, setInterests] = useState<string[]>(["Edge AI", "Robotics", "Privacy"])

  // Looking for
  const [lookingForCofounder, setLookingForCofounder] = useState(true)
  const [lookingForTeam, setLookingForTeam] = useState(true)
  const [lookingForFunding, setLookingForFunding] = useState(false)
  const [cofounderSkills, setCofounderSkills] = useState<string[]>(["Software", "Marketing"])

  // Visibility
  const [publicProfile, setPublicProfile] = useState(true)
  const [handle, setHandle] = useState("alexchen")
  const [links] = useState([
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ])

  // Trust (mocked)
  const trust = 78
  const trustBreakdown = { ndas: 2, escrowReleases: 3, receipts: 8, history: 1 }

  function toggleSkill(skill: string) {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  function toggleInterest(interest: string) {
    setInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  function toggleCofounderSkill(skill: string) {
    setCofounderSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const projects = [
    { id: "p1", name: "Edge Vision Kit", status: "Active" },
    { id: "p2", name: "Local‑first Creator Analytics", status: "Seeking funding" },
    { id: "p3", name: "Climate Hardware Sensors", status: "Draft" },
  ]

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Header */}
      <section className="rounded-xl bg-[#101113] p-5">
        <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_360px] md:items-start lg:items-center">
          {/* Avatar */}
          <div>
            <AvatarUploader name={name} src={avatarUrl} onChange={(_, url) => setAvatarUrl(url)} size={80} />
          </div>

          {/* Name + Verified + Role */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight break-words">{name}</h1>
              <VerificationBadge className="shrink-0" />
            </div>
            <p className="mt-1 flex items-center gap-2 text-white/70 text-sm">
              <Building2 className="h-4 w-4 text-white/60" />
              <span className="truncate">
                {role} • {company}
              </span>
            </p>
            <p className="text-white/60 text-sm">{location}</p>
          </div>

          {/* Trust + Actions */}
          <div className="flex items-center gap-4 md:col-span-2 lg:col-span-1">
            <div className="flex-1 lg:flex-none">
              <TrustInspector trust={trust} baseline={75} breakdown={trustBreakdown} className="w-full max-w-[220px]" />
            </div>
            <Button className="rounded-md bg-white text-[#0b0b0c] hover:bg-white/90">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Request re‑verify
            </Button>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Main column */}
        <div className="min-w-0 space-y-6">
          {/* Basic info */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <UserRound className="h-4 w-4" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#0f1012] border-[#1a1b1e]"
                />
              </Field>
              <Field label="Role">
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-[#0f1012] border-[#1a1b1e]"
                />
              </Field>
              <Field label="Company">
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-[#0f1012] border-[#1a1b1e]"
                />
              </Field>
              <Field label="Location">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-[#0f1012] border-[#1a1b1e]"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Bio">
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="min-h-[100px] bg-[#0f1012] border-[#1a1b1e]"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Button className="w-fit rounded-md bg-white text-[#0b0b0c] hover:bg-white/90">Save profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Skills & Interests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Your skills</div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => {
                    const selected = skills.includes(skill)
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={cn(
                          "text-xs rounded-md px-3 py-1.5 border transition",
                          selected
                            ? "border-white/30 bg-white/[0.06]"
                            : "border-[#1a1b1e] text-white/80 hover:bg-white/[0.03]",
                        )}
                        aria-pressed={selected}
                      >
                        {skill}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Interests</div>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => {
                    const selected = interests.includes(interest)
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={cn(
                          "text-xs rounded-md px-3 py-1.5 border transition",
                          selected
                            ? "border-white/30 bg-white/[0.06]"
                            : "border-[#1a1b1e] text-white/80 hover:bg-white/[0.03]",
                        )}
                        aria-pressed={selected}
                      >
                        {interest}
                      </button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Looking for */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                What you're looking for
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <RowSwitch
                label="Co-founder"
                desc="Open to finding a complementary co-founder."
                checked={lookingForCofounder}
                onCheckedChange={setLookingForCofounder}
              />
              <RowSwitch
                label="Team members"
                desc="Actively hiring for your team."
                checked={lookingForTeam}
                onCheckedChange={setLookingForTeam}
              />
              <RowSwitch
                label="Funding"
                desc="Seeking investment or community funding."
                checked={lookingForFunding}
                onCheckedChange={setLookingForFunding}
              />

              {lookingForCofounder && (
                <div className="grid gap-2 pt-2">
                  <div className="text-sm font-medium">Co-founder skills needed</div>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill) => {
                      const selected = cofounderSkills.includes(skill)
                      return (
                        <button
                          key={skill}
                          onClick={() => toggleCofounderSkill(skill)}
                          className={cn(
                            "text-xs rounded-md px-3 py-1.5 border transition",
                            selected
                              ? "border-white/30 bg-white/[0.06]"
                              : "border-[#1a1b1e] text-white/80 hover:bg-white/[0.03]",
                          )}
                          aria-pressed={selected}
                        >
                          {skill}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right rail */}
        <aside className="space-y-6">
          {/* Visibility & links */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                Visibility & links
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <RowSwitch
                label="Public profile"
                desc="Share a linkable founder profile."
                checked={publicProfile}
                onCheckedChange={setPublicProfile}
              />
              <div className="grid gap-2">
                <div className="text-xs text-white/60">Handle</div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">@</span>
                  <Input
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="h-8 bg-[#0f1012] border-[#1a1b1e]"
                  />
                </div>
                <div className="text-xs text-white/60">
                  Profile URL: <span className="text-white">mutiny.to/{handle}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="text-xs text-white/60">Linked accounts</div>
                <div className="flex flex-wrap gap-2">
                  {links.map((l, i) => (
                    <a
                      key={i}
                      href={l.href}
                      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#0f1012] px-2.5 py-1.5 text-xs hover:bg-white/[0.04]"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                      {l.label}
                    </a>
                  ))}
                  <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#0f1012] px-2 py-1 text-[11px] text-white/80 hover:bg-white/[0.04]">
                    Connect…
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Your projects</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {projects.map((p) => (
                <div key={p.id} className="rounded-md border border-white/10 bg-[#0f1012] px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium">{p.name}</div>
                    <Badge variant="secondary" className="bg-white/[0.04] text-white border-white/10 text-xs">
                      {p.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="text-[11px] text-white/60">Visible to potential co-founders and investors.</div>
            </CardContent>
          </Card>

          {/* Guidance */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="rounded-md border border-white/10 bg-[#0f1012] px-3 py-2">
                Complete profiles get 3x more co-founder matches.
              </div>
              <div className="rounded-md border border-white/10 bg-[#0f1012] px-3 py-2">
                Trust grows with project transparency and milestone completion.
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <label className="text-xs text-white/60">{label}</label>
      {children}
    </div>
  )
}

function RowSwitch({
  label,
  desc,
  checked,
  onCheckedChange,
}: {
  label: string
  desc?: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-md border border-[#1a1b1e] bg-[#0f1012] p-3">
      <div className="min-w-0">
        <div className="font-medium">{label}</div>
        {desc && <div className="text-xs text-white/60">{desc}</div>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={label} />
    </div>
  )
}
