"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PostIdeaModal } from "@/components/post-idea-modal"
import { Search, Plus, Filter, Eye, MessageSquare, Heart, Edit } from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "yours" | "discover"

type Stage = "concept" | "prototype" | "mvp" | "launched"

type Idea = {
  id: string
  title: string
  author: string
  desc: string
  tags: string[]
  stage: Stage
  funding?: string
  likes: number
  comments: number
  views: number
  isYours?: boolean
  lookingFor?: string[]
  description?: string
  isDraft?: boolean
  createdAt?: string
}

type IdeaFormData = {
  title: string
  description: string
  tags: string[]
  stage: Stage
  lookingFor: string[]
  isDraft: boolean
}

const YOUR_IDEAS: Idea[] = [
  {
    id: "y1",
    title: "Edge Vision Kit",
    author: "You",
    desc: "Low‑power on‑device vision kit with local models. Shipping v0 sensors to early adopters.",
    description:
      "Low‑power on‑device vision kit with local models. Shipping v0 sensors to early adopters. This system enables real-time computer vision processing without cloud dependency, perfect for robotics and IoT applications.",
    tags: ["Edge AI", "Robotics", "Hardware"],
    stage: "mvp",
    funding: "$8,000 raised",
    likes: 24,
    comments: 8,
    views: 156,
    isYours: true,
    lookingFor: ["Hardware engineer", "Go-to-market lead"],
    isDraft: false,
    createdAt: "2024-01-15",
  },
  {
    id: "y2",
    title: "Local‑first Creator Analytics",
    author: "You",
    desc: "Privacy‑first analytics with CRDT sync across devices. No data leaves your control.",
    description:
      "Privacy‑first analytics with CRDT sync across devices. No data leaves your control. Built for creators who want to understand their audience without compromising privacy.",
    tags: ["Creator infra", "Privacy", "Local‑first"],
    stage: "prototype",
    funding: "$4,400 / $12,000",
    likes: 18,
    comments: 12,
    views: 89,
    isYours: true,
    lookingFor: ["Frontend developer", "Marketing advisor"],
    isDraft: false,
    createdAt: "2024-01-12",
  },
  {
    id: "y3",
    title: "Climate Hardware Sensors",
    author: "You",
    desc: "Modular environmental sensors with open data protocols. Still refining the concept.",
    description:
      "Modular environmental sensors with open data protocols. Still refining the concept. Aiming to create affordable, accurate climate monitoring for communities worldwide.",
    tags: ["Climate hardware", "IoT"],
    stage: "concept",
    likes: 5,
    comments: 2,
    views: 23,
    isYours: true,
    lookingFor: ["Co-founder", "Climate expert"],
    isDraft: true,
    createdAt: "2024-01-10",
  },
]

const DISCOVER_IDEAS: Idea[] = [
  {
    id: "d1",
    title: "Neurotech IDE",
    author: "Sam K.",
    desc: "Local‑only IDE and toolchain for neural interfaces. Privacy‑first development environment.",
    tags: ["Bio tooling", "Privacy", "Dev tools"],
    stage: "prototype",
    likes: 42,
    comments: 15,
    views: 234,
    lookingFor: ["Frontend developer", "Neuroscientist"],
  },
  {
    id: "d2",
    title: "DePIN Sensor Mesh",
    author: "Riley M.",
    desc: "Community-powered sensor mesh with provable data lineage and token incentives.",
    tags: ["DePIN", "Edge AI", "Crypto"],
    stage: "mvp",
    funding: "Seeking $60k",
    likes: 67,
    comments: 23,
    views: 445,
    lookingFor: ["Blockchain developer", "Hardware engineer"],
  },
  {
    id: "d3",
    title: "Robotics Firmware Co‑pilot",
    author: "Alex P.",
    desc: "AI assistant that writes and tests firmware for robotics teams. Supports ARM/RISC‑V.",
    tags: ["Robotics", "AI", "Dev tools"],
    stage: "launched",
    likes: 89,
    comments: 31,
    views: 678,
    lookingFor: ["Sales lead", "Technical writer"],
  },
  {
    id: "d4",
    title: "Quantum Computing Simulator",
    author: "Jordan L.",
    desc: "Browser-based quantum circuit simulator for education and research. No installation required.",
    tags: ["Quantum", "EdTech", "Simulation"],
    stage: "prototype",
    likes: 156,
    comments: 42,
    views: 892,
    lookingFor: ["Quantum physicist", "UI/UX designer"],
  },
  {
    id: "d5",
    title: "Sustainable Supply Chain Tracker",
    author: "Maya S.",
    desc: "Blockchain-based supply chain transparency for sustainable brands. Track from source to consumer.",
    tags: ["Sustainability", "Blockchain", "Supply Chain"],
    stage: "concept",
    likes: 73,
    comments: 18,
    views: 324,
    lookingFor: ["Supply chain expert", "Sustainability advisor"],
  },
  {
    id: "d6",
    title: "Voice-First Coding Assistant",
    author: "Chris T.",
    desc: "Code by speaking naturally. AI converts voice commands to code across multiple languages.",
    tags: ["AI", "Accessibility", "Dev tools"],
    stage: "mvp",
    funding: "Pre-seed raised",
    likes: 201,
    comments: 67,
    views: 1243,
    lookingFor: ["Speech recognition expert", "Developer advocate"],
  },
]

export default function FounderIdeasPage() {
  const [tab, setTab] = useState<Tab>("yours")
  const [query, setQuery] = useState("")
  const [yourIdeas, setYourIdeas] = useState<Idea[]>(YOUR_IDEAS)
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const ideas = tab === "yours" ? yourIdeas : DISCOVER_IDEAS
  const filtered = ideas.filter(
    (idea) =>
      idea.title.toLowerCase().includes(query.toLowerCase()) ||
      idea.desc.toLowerCase().includes(query.toLowerCase()) ||
      idea.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
  )

  function handleIdeaSubmit(data: IdeaFormData) {
    const newIdea: Idea = {
      id: `y${Date.now()}`,
      title: data.title,
      author: "You",
      desc: data.description,
      description: data.description,
      tags: data.tags,
      stage: data.stage,
      likes: 0,
      comments: 0,
      views: 0,
      isYours: true,
      lookingFor: data.lookingFor,
      isDraft: data.isDraft,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setYourIdeas((prev) => [newIdea, ...prev])
  }

  function handleIdeaUpdate(ideaData: IdeaFormData) {
    if (editingIdea) {
      setYourIdeas((prev) =>
        prev.map((idea) =>
          idea.id === editingIdea.id
            ? {
                ...idea,
                title: ideaData.title,
                desc: ideaData.description,
                description: ideaData.description,
                tags: ideaData.tags,
                stage: ideaData.stage,
                lookingFor: ideaData.lookingFor,
                isDraft: ideaData.isDraft,
              }
            : idea,
        ),
      )
    }
    setEditingIdea(null)
    setIsModalOpen(false)
  }

  function handleModalSubmit(data: IdeaFormData) {
    if (editingIdea) {
      handleIdeaUpdate(data)
    } else {
      handleIdeaSubmit(data)
    }
  }

  function handleModalDelete() {
    if (editingIdea) {
      handleIdeaDelete(editingIdea.id)
    }
  }

  function handleIdeaDelete(id: string) {
    setYourIdeas((prev) => prev.filter((idea) => idea.id !== id))
    setEditingIdea(null)
    setIsModalOpen(false)
  }

  function handleEditClick(idea: Idea) {
    setEditingIdea(idea)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setEditingIdea(null)
    setIsModalOpen(false)
  }

  function handleViewClick(idea: Idea) {
    if (idea.isYours) {
      // For your own ideas, just show them in the same view
      return
    } else {
      // For discover ideas, navigate to detail page
      router.push(`/founder/ideas/${idea.id}`)
    }
  }

  function IdeaCard({ idea }: { idea: Idea }) {
    return (
      <Card className="bg-[#101113] border-[#1a1b1e] hover:bg-[#101113]/80 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-base leading-tight">{idea.title}</h3>
                {idea.isDraft && (
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs">
                    Draft
                  </Badge>
                )}
              </div>
              <p className="text-xs text-white/60">by {idea.author}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs shrink-0",
                  idea.stage === "launched"
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                    : idea.stage === "mvp"
                      ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                      : idea.stage === "prototype"
                        ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                        : "bg-white/[0.04] text-white border-white/10",
                )}
              >
                {idea.stage.toUpperCase()}
              </Badge>
              {idea.isYours && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditClick(idea)}
                  className="h-7 w-7 text-white/60 hover:text-white"
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>

          <p className="text-sm text-white/70 mb-3 line-clamp-3">{idea.desc}</p>

          <div className="flex flex-wrap gap-1 mb-3">
            {idea.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/[0.04] text-white border-white/10 text-xs">
                {tag}
              </Badge>
            ))}
            {idea.tags.length > 3 && (
              <Badge variant="secondary" className="bg-white/[0.04] text-white border-white/10 text-xs">
                +{idea.tags.length - 3}
              </Badge>
            )}
          </div>

          {idea.lookingFor && idea.lookingFor.length > 0 && (
            <div className="mb-3">
              <div className="text-xs text-white/60 mb-1">Looking for:</div>
              <div className="flex flex-wrap gap-1">
                {idea.lookingFor.slice(0, 2).map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="bg-white/[0.02] text-white/80 border-white/5 text-xs"
                  >
                    {item}
                  </Badge>
                ))}
                {idea.lookingFor.length > 2 && (
                  <Badge variant="secondary" className="bg-white/[0.02] text-white/80 border-white/5 text-xs">
                    +{idea.lookingFor.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {idea.funding && <div className="text-xs text-white/60 mb-3">{idea.funding}</div>}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                {idea.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {idea.comments}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {idea.views}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={() => handleViewClick(idea)}
              className="h-7 text-xs border-[#1a1b1e] text-white hover:bg-white/[0.06] bg-transparent"
            >
              {idea.isYours ? "Share" : "View"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-[#101113] p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Ideas</h1>
            <p className="text-sm text-white/70 mt-1">Share your concepts and discover what others are building.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="rounded-md bg-white text-[#0b0b0c] hover:bg-white/90">
            <Plus className="mr-2 h-4 w-4" />
            Post new idea
          </Button>
        </div>
      </div>

      {/* Tabs and search */}
      <div className="rounded-xl bg-[#101113] p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex rounded-lg border border-[#1a1b1e] bg-[#0f1012] p-1">
            <button
              onClick={() => setTab("yours")}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition",
                tab === "yours" ? "bg-white text-[#0b0b0c]" : "text-white/80 hover:text-white",
              )}
            >
              Your ideas ({yourIdeas.length})
            </button>
            <button
              onClick={() => setTab("discover")}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition",
                tab === "discover" ? "bg-white text-[#0b0b0c]" : "text-white/80 hover:text-white",
              )}
            >
              Discover
            </button>
          </div>

          <div className="flex gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <Input
                placeholder="Search ideas, tags, authors…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8 bg-[#0f1012] border-[#1a1b1e] text-white placeholder:text-white/40"
              />
            </div>
            <Button variant="outline" className="border-[#1a1b1e] text-white hover:bg-white/[0.06] bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Ideas grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="text-white/60">No ideas found matching your search.</div>
        </div>
      )}

      {/* Post/Edit Idea Modal */}
      <PostIdeaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        onDelete={editingIdea ? handleModalDelete : undefined}
        editingIdea={editingIdea}
      />
    </div>
  )
}