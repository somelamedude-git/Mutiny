"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MessageCircle,
  Heart,
  Share2,
  ExternalLink,
  Calendar,
  DollarSign,
  Users,
  Eye,
  CheckCircle2,
  MapPin,
  Building,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for the idea
const IDEA_DATA = {
  id: "quantum-sim",
  title: "Quantum Computing Simulator",
  description: `## Overview
A browser-based quantum computing simulator that makes quantum algorithms accessible to developers and researchers without requiring specialized hardware.

## Key Features
• Visual quantum circuit builder with drag-and-drop interface
• Real-time simulation of quantum algorithms
• Educational tutorials for quantum computing concepts
• Integration with popular quantum frameworks
• Cloud-based collaboration tools

## Technical Approach
Built with WebAssembly for high-performance simulation, React for the frontend, and Python backend for quantum algorithm processing. Uses advanced mathematical libraries for accurate quantum state representation.

## Market Opportunity
The quantum computing education market is growing rapidly, with universities and tech companies investing heavily in quantum literacy programs.`,
  stage: "prototype" as const,
  founder: {
    name: "Dr. Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Quantum physicist turned entrepreneur. Former researcher at IBM Quantum, PhD from MIT. Passionate about making quantum computing accessible to everyone.",
    location: "San Francisco, CA",
    company: "Quantum Dynamics Lab",
  },
  lookingFor: ["Frontend Developer", "Quantum Physicist", "Technical Writer", "Marketing Lead"],
  tags: ["Quantum Computing", "WebAssembly", "Education", "Simulation"],
  stats: {
    views: 1247,
    likes: 89,
    comments: 23,
  },
  funding: {
    raised: 15000,
    goal: 50000,
    backers: 12,
  },
  timeline: "6 months",
  teamSize: 3,
  links: [
    { label: "Demo", url: "https://quantum-sim-demo.com" },
    { label: "GitHub", url: "https://github.com/quantum-sim" },
    { label: "Research Paper", url: "https://arxiv.org/quantum-sim" },
  ],
}

export default function IdeaDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [appliedRoles, setAppliedRoles] = useState<string[]>([])
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(IDEA_DATA.stats.likes)

  const handleApply = (role: string) => {
    if (!appliedRoles.includes(role)) {
      setAppliedRoles([...appliedRoles, role])
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const handleMessage = () => {
    router.push("/founder/chats")
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    // Could add a toast notification here
  }

  const formatDescription = (text: string) => {
    return text.split("\n").map((line, index) => {
      if (line.startsWith("## ")) {
        return (
          <h3 key={index} className="text-lg font-semibold mt-4 mb-2 first:mt-0">
            {line.replace("## ", "")}
          </h3>
        )
      }
      if (line.startsWith("• ")) {
        return (
          <li key={index} className="ml-4 text-white/80">
            {line.replace("• ", "")}
          </li>
        )
      }
      if (line.trim() === "") {
        return <br key={index} />
      }
      return (
        <p key={index} className="text-white/80 leading-relaxed">
          {line}
        </p>
      )
    })
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "concept":
        return "bg-purple-500/10 text-purple-300 border-purple-500/20"
      case "prototype":
        return "bg-blue-500/10 text-blue-300 border-blue-500/20"
      case "mvp":
        return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
      case "launched":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
      default:
        return "bg-white/[0.04] text-white border-white/10"
    }
  }

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="text-white/70 hover:text-white hover:bg-white/[0.06]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to ideas
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Left Column - Main Content */}
        <div className="space-y-6">
          {/* Title and Actions */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">{IDEA_DATA.title}</h1>
                  <Badge variant="secondary" className={getStageColor(IDEA_DATA.stage)}>
                    {IDEA_DATA.stage}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLike}
                    className={`border-[#1a1b1e] hover:bg-white/[0.06] ${
                      isLiked ? "text-red-400 border-red-400/20" : "text-white"
                    }`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                    {likeCount}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="border-[#1a1b1e] text-white hover:bg-white/[0.06] bg-transparent"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button onClick={handleMessage} className="bg-white text-[#0b0b0c] hover:bg-white/90">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message founder
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Description */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader>
              <CardTitle className="text-lg">Project Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">{formatDescription(IDEA_DATA.description)}</CardContent>
          </Card>

          {/* Looking For */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader>
              <CardTitle className="text-lg">Looking For</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {IDEA_DATA.lookingFor.map((role) => (
                  <div
                    key={role}
                    className="flex items-center justify-between p-3 rounded-lg border border-[#1a1b1e] bg-[#0f1012]"
                  >
                    <div>
                      <div className="font-medium text-sm">{role}</div>
                      <div className="text-xs text-white/60">
                        {role === "Frontend Developer" && "React, TypeScript, WebAssembly experience preferred"}
                        {role === "Quantum Physicist" && "PhD in quantum computing or related field"}
                        {role === "Technical Writer" && "Experience with developer documentation"}
                        {role === "Marketing Lead" && "B2B SaaS marketing experience"}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleApply(role)}
                      disabled={appliedRoles.includes(role)}
                      className={
                        appliedRoles.includes(role)
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/10"
                          : "bg-white text-[#0b0b0c] hover:bg-white/90"
                      }
                    >
                      {appliedRoles.includes(role) ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Applied
                        </>
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* External Links */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader>
              <CardTitle className="text-lg">Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {IDEA_DATA.links.map((link) => (
                  <Button
                    key={link.label}
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-[#1a1b1e] text-white hover:bg-white/[0.06] bg-transparent"
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Founder Profile */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader>
              <CardTitle className="text-base">Founder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={IDEA_DATA.founder.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {IDEA_DATA.founder.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{IDEA_DATA.founder.name}</div>
                  <div className="text-xs text-white/60 flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {IDEA_DATA.founder.location}
                  </div>
                  <div className="text-xs text-white/60 flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    {IDEA_DATA.founder.company}
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">{IDEA_DATA.founder.bio}</p>
            </CardContent>
          </Card>

          {/* Project Stats */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader>
              <CardTitle className="text-base">Project Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-white/60 text-xs mb-1">
                    <Eye className="h-3 w-3" />
                    Views
                  </div>
                  <div className="font-semibold">{IDEA_DATA.stats.views.toLocaleString()}</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-white/60 text-xs mb-1">
                    <Heart className="h-3 w-3" />
                    Likes
                  </div>
                  <div className="font-semibold">{likeCount}</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-white/60 text-xs mb-1">
                    <MessageCircle className="h-3 w-3" />
                    Comments
                  </div>
                  <div className="font-semibold">{IDEA_DATA.stats.comments}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader>
              <CardTitle className="text-base">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Timeline</span>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3 w-3 text-white/60" />
                  {IDEA_DATA.timeline}
                </div>
              </div>
              <Separator className="bg-[#1a1b1e]" />
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Team size</span>
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-3 w-3 text-white/60" />
                  {IDEA_DATA.teamSize} members
                </div>
              </div>
              <Separator className="bg-[#1a1b1e]" />
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Funding</span>
                <div className="flex items-center gap-1 text-sm">
                  <DollarSign className="h-3 w-3 text-white/60" />${IDEA_DATA.funding.raised.toLocaleString()} raised
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {IDEA_DATA.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/[0.04] text-white border-white/10 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
