"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Search,
  Plus,
  Eye,
  Edit,
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Upload,
  Receipt,
  ExternalLink,
} from "lucide-react"
import { NewCampaignModal } from "@/components/new-campaign-modal"
import { FundUsageModal } from "@/components/fund-usage-modal"

export default function CommunityFundingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showReleaseModal, setShowReleaseModal] = useState(false)
  const [showFundUsageModal, setShowFundUsageModal] = useState(false)
  const [showUsageHistoryModal, setShowUsageHistoryModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "AI-Powered Code Assistant",
      description: "Revolutionary coding assistant that understands context and generates production-ready code",
      goal: 50000,
      raised: 32500,
      backers: 127,
      daysLeft: 23,
      status: "active",
      stage: "mvp",
      tags: ["AI/ML", "Developer Tools"],
      milestones: [
        { title: "Core Engine", amount: 15000, completed: true },
        { title: "UI Development", amount: 20000, completed: true },
        { title: "Beta Testing", amount: 15000, completed: false },
      ],
      fundUsage: [
        {
          id: 1,
          category: "Development",
          amount: 8500,
          description: "Backend API development and database setup",
          date: "2024-01-15",
          vendor: "AWS",
          status: "approved",
          receipts: ["aws-invoice-jan.pdf"],
          proofImages: ["dashboard-screenshot.png"],
        },
        {
          id: 2,
          category: "Software/Tools",
          amount: 2400,
          description: "Development tools and software licenses",
          date: "2024-01-20",
          vendor: "JetBrains, GitHub",
          status: "approved",
          receipts: ["jetbrains-receipt.pdf", "github-invoice.pdf"],
          proofImages: [],
        },
        {
          id: 3,
          category: "Marketing",
          amount: 1200,
          description: "Social media advertising campaign",
          date: "2024-01-25",
          vendor: "Meta Ads",
          status: "pending",
          receipts: ["meta-ads-receipt.pdf"],
          proofImages: ["ad-performance.png"],
        },
      ],
    },
    {
      id: 2,
      title: "Sustainable Supply Chain Tracker",
      description: "Blockchain-based platform for tracking product sustainability across supply chains",
      goal: 75000,
      raised: 8200,
      backers: 34,
      daysLeft: 45,
      status: "active",
      stage: "prototype",
      tags: ["Blockchain", "Sustainability"],
      milestones: [
        { title: "Smart Contracts", amount: 25000, completed: false },
        { title: "Mobile App", amount: 30000, completed: false },
        { title: "Enterprise Integration", amount: 20000, completed: false },
      ],
      fundUsage: [
        {
          id: 1,
          category: "Research",
          amount: 3500,
          description: "Blockchain research and proof of concept development",
          date: "2024-01-10",
          vendor: "Freelance Developer",
          status: "approved",
          receipts: ["freelancer-invoice.pdf"],
          proofImages: ["poc-demo.png"],
        },
      ],
    },
    {
      id: 3,
      title: "Voice-First Coding IDE",
      description: "Code with your voice using advanced speech recognition and natural language processing",
      goal: 40000,
      raised: 40000,
      backers: 89,
      daysLeft: 0,
      status: "completed",
      stage: "launched",
      tags: ["Voice Tech", "Developer Tools"],
      milestones: [
        { title: "Voice Engine", amount: 15000, completed: true },
        { title: "IDE Integration", amount: 15000, completed: true },
        { title: "Launch & Marketing", amount: 10000, completed: true },
      ],
      fundUsage: [
        {
          id: 1,
          category: "Development",
          amount: 18000,
          description: "Voice recognition engine development",
          date: "2023-12-01",
          vendor: "Speech Tech Solutions",
          status: "approved",
          receipts: ["speech-tech-invoice.pdf"],
          proofImages: ["voice-engine-demo.mp4"],
        },
        {
          id: 2,
          category: "Marketing",
          amount: 8500,
          description: "Product launch campaign and PR",
          date: "2023-12-15",
          vendor: "Marketing Agency",
          status: "approved",
          receipts: ["marketing-invoice.pdf"],
          proofImages: ["launch-metrics.png"],
        },
        {
          id: 3,
          category: "Legal",
          amount: 3200,
          description: "Patent filing and legal consultation",
          date: "2023-12-20",
          vendor: "Tech Law Firm",
          status: "approved",
          receipts: ["legal-invoice.pdf"],
          proofImages: [],
        },
      ],
    },
  ])

  const handleCreateCampaign = (campaignData: any) => {
    const newCampaign = {
      id: campaigns.length + 1,
      title: campaignData.ideaName,
      description: campaignData.description,
      goal: Number.parseInt(campaignData.fundingGoal),
      raised: 0,
      backers: 0,
      daysLeft: Number.parseInt(campaignData.duration),
      status: campaignData.status,
      stage: campaignData.stage,
      tags: campaignData.tags,
      milestones: campaignData.milestones.map((m: any) => ({
        title: m.title,
        amount: Number.parseInt(m.amount) || 0,
        completed: false,
      })),
      fundUsage: [],
    }
    setCampaigns([newCampaign, ...campaigns])
  }

  const handleAddFundUsage = (usage: any) => {
    if (selectedCampaign) {
      const updatedCampaigns = campaigns.map((campaign) =>
        campaign.id === selectedCampaign.id
          ? { ...campaign, fundUsage: [...(campaign.fundUsage || []), usage] }
          : campaign,
      )
      setCampaigns(updatedCampaigns)
      setSelectedCampaign({ ...selectedCampaign, fundUsage: [...(selectedCampaign.fundUsage || []), usage] })
    }
  }

  const handleViewCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowViewModal(true)
  }

  const handleEditCampaign = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowEditModal(true)
  }

  const handleRequestRelease = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowReleaseModal(true)
  }

  const handleReportUsage = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowFundUsageModal(true)
  }

  const handleViewUsageHistory = (campaign: any) => {
    setSelectedCampaign(campaign)
    setShowUsageHistoryModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
      case "draft":
        return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
      case "completed":
        return "bg-blue-500/10 text-blue-300 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-300 border-gray-500/20"
    }
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
        return "bg-gray-500/10 text-gray-300 border-gray-500/20"
    }
  }

  const getUsageStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-300 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-300 border-gray-500/20"
    }
  }

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getTotalUsed = (campaign: any) => {
    return (campaign.fundUsage || []).reduce((sum: number, usage: any) => sum + usage.amount, 0)
  }

  const getTransparencyScore = (campaign: any) => {
    const totalUsed = getTotalUsed(campaign)
    const approvedUsage = (campaign.fundUsage || []).filter((u: any) => u.status === "approved")
    if (totalUsed === 0) return 100
    return Math.round((approvedUsage.reduce((sum: number, u: any) => sum + u.amount, 0) / totalUsed) * 100)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Community Funding</h1>
          <p className="text-white/60 mt-1">Raise funds from the community for your projects</p>
        </div>
        <Button onClick={() => setShowNewCampaign(true)} className="bg-white text-black hover:bg-white/90">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
        <Input
          placeholder="Search campaigns..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-[#0f1012] border-[#1a1b1e]"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#0f1012] border border-[#1a1b1e] rounded-lg p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-white/60">Total Raised</span>
          </div>
          <p className="text-xl font-semibold mt-1">
            ${campaigns.reduce((sum, c) => sum + c.raised, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-[#0f1012] border border-[#1a1b1e] rounded-lg p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-white/60">Active Campaigns</span>
          </div>
          <p className="text-xl font-semibold mt-1">{campaigns.filter((c) => c.status === "active").length}</p>
        </div>
        <div className="bg-[#0f1012] border border-[#1a1b1e] rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-white/60">Total Backers</span>
          </div>
          <p className="text-xl font-semibold mt-1">{campaigns.reduce((sum, c) => sum + c.backers, 0)}</p>
        </div>
        <div className="bg-[#0f1012] border border-[#1a1b1e] rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-white/60">Completed</span>
          </div>
          <p className="text-xl font-semibold mt-1">{campaigns.filter((c) => c.status === "completed").length}</p>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-[#0f1012] border border-[#1a1b1e] rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium">{campaign.title}</h3>
                  <Badge variant="secondary" className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                  <Badge variant="secondary" className={getStageColor(campaign.stage)}>
                    {campaign.stage}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 border-blue-500/20">
                    {getTransparencyScore(campaign)}% transparent
                  </Badge>
                </div>
                <p className="text-white/60 mb-3">{campaign.description}</p>
                <div className="flex flex-wrap gap-2">
                  {campaign.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-[#1a1b1e] text-white/70">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewCampaign(campaign)}
                  className="border-[#1a1b1e] hover:bg-white/5"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditCampaign(campaign)}
                  className="border-[#1a1b1e] hover:bg-white/5"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                {campaign.raised > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReportUsage(campaign)}
                    className="border-[#1a1b1e] hover:bg-white/5"
                  >
                    <Receipt className="h-3 w-3 mr-1" />
                    Report Usage
                  </Button>
                )}
                {(campaign.fundUsage || []).length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewUsageHistory(campaign)}
                    className="border-[#1a1b1e] hover:bg-white/5"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Usage History
                  </Button>
                )}
                {campaign.status === "active" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRequestRelease(campaign)}
                    className="border-[#1a1b1e] hover:bg-white/5"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Request Release
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-white/60">Funding Progress</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>${campaign.raised.toLocaleString()}</span>
                    <span className="text-white/60">of ${campaign.goal.toLocaleString()}</span>
                  </div>
                  <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                  <p className="text-xs text-white/60">{Math.round((campaign.raised / campaign.goal) * 100)}% funded</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Receipt className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-white/60">Funds Used</span>
                </div>
                <p className="text-xl font-semibold">${getTotalUsed(campaign).toLocaleString()}</p>
                <p className="text-xs text-white/60">
                  {campaign.raised > 0 ? Math.round((getTotalUsed(campaign) / campaign.raised) * 100) : 0}% of raised
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-white/60">Backers</span>
                </div>
                <p className="text-xl font-semibold">{campaign.backers}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-white/60">Time Left</span>
                </div>
                <p className="text-xl font-semibold">{campaign.daysLeft > 0 ? `${campaign.daysLeft} days` : "Ended"}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-white/60">Milestones</span>
                </div>
                <p className="text-xl font-semibold">
                  {campaign.milestones.filter((m) => m.completed).length}/{campaign.milestones.length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Campaign Modal */}
      <NewCampaignModal
        open={showNewCampaign}
        onOpenChange={setShowNewCampaign}
        onCreateCampaign={handleCreateCampaign}
      />

      {/* Fund Usage Modal */}
      <FundUsageModal
        open={showFundUsageModal}
        onOpenChange={setShowFundUsageModal}
        campaign={selectedCampaign}
        onAddUsage={handleAddFundUsage}
      />

      {/* Usage History Modal */}
      <Dialog open={showUsageHistoryModal} onOpenChange={setShowUsageHistoryModal}>
        <DialogContent className="bg-[#101113] border-[#1a1b1e] max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Fund Usage History - {selectedCampaign?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 p-4 bg-[#0f1012] rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-400">${selectedCampaign.raised.toLocaleString()}</p>
                  <p className="text-sm text-white/60">Total Raised</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-400">
                    ${getTotalUsed(selectedCampaign).toLocaleString()}
                  </p>
                  <p className="text-sm text-white/60">Total Used</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">{getTransparencyScore(selectedCampaign)}%</p>
                  <p className="text-sm text-white/60">Transparency Score</p>
                </div>
              </div>

              <div className="space-y-3">
                {(selectedCampaign.fundUsage || []).map((usage: any) => (
                  <div key={usage.id} className="p-4 border border-[#1a1b1e] rounded-lg bg-[#0f1012]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{usage.description}</h4>
                          <Badge variant="secondary" className={getUsageStatusColor(usage.status)}>
                            {usage.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm text-white/60">
                          <div>
                            <span className="block text-white/40">Category</span>
                            <span>{usage.category}</span>
                          </div>
                          <div>
                            <span className="block text-white/40">Amount</span>
                            <span className="text-emerald-400 font-medium">${usage.amount.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="block text-white/40">Date</span>
                            <span>{new Date(usage.date).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="block text-white/40">Vendor</span>
                            <span>{usage.vendor || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {(usage.receipts?.length > 0 || usage.proofImages?.length > 0) && (
                      <div className="mt-3 pt-3 border-t border-[#1a1b1e]">
                        <div className="flex items-center gap-4">
                          {usage.receipts?.length > 0 && (
                            <div className="flex items-center gap-2">
                              <Receipt className="h-4 w-4 text-green-400" />
                              <span className="text-sm text-white/60">{usage.receipts.length} receipt(s)</span>
                            </div>
                          )}
                          {usage.proofImages?.length > 0 && (
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-400" />
                              <span className="text-sm text-white/60">{usage.proofImages.length} proof image(s)</span>
                            </div>
                          )}
                          <Button variant="ghost" size="sm" className="ml-auto text-white/60 hover:text-white">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Files
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Campaign Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="bg-[#101113] border-[#1a1b1e] max-w-2xl">
          <DialogHeader>
            <DialogTitle>Campaign Preview</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">{selectedCampaign.title}</h2>
                <p className="text-white/70">{selectedCampaign.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#0f1012] rounded-lg">
                  <p className="text-2xl font-bold text-emerald-400">${selectedCampaign.raised.toLocaleString()}</p>
                  <p className="text-sm text-white/60">Raised</p>
                </div>
                <div className="text-center p-4 bg-[#0f1012] rounded-lg">
                  <p className="text-2xl font-bold text-blue-400">{selectedCampaign.backers}</p>
                  <p className="text-sm text-white/60">Backers</p>
                </div>
                <div className="text-center p-4 bg-[#0f1012] rounded-lg">
                  <p className="text-2xl font-bold text-purple-400">{selectedCampaign.daysLeft}</p>
                  <p className="text-sm text-white/60">Days Left</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Milestones</h3>
                <div className="space-y-2">
                  {selectedCampaign.milestones.map((milestone: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#0f1012] rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle
                          className={`h-4 w-4 ${milestone.completed ? "text-emerald-400" : "text-white/30"}`}
                        />
                        <span className={milestone.completed ? "text-white" : "text-white/60"}>{milestone.title}</span>
                      </div>
                      <span className="text-sm text-white/60">${milestone.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Campaign Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="bg-[#101113] border-[#1a1b1e] max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Campaign Details</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Campaign Title</Label>
                <Input
                  id="edit-title"
                  defaultValue={selectedCampaign.title}
                  className="bg-[#0f1012] border-[#1a1b1e]"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  defaultValue={selectedCampaign.description}
                  className="bg-[#0f1012] border-[#1a1b1e] min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="edit-goal">Funding Goal ($)</Label>
                <Input
                  id="edit-goal"
                  type="number"
                  defaultValue={selectedCampaign.goal}
                  className="bg-[#0f1012] border-[#1a1b1e]"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="bg-white text-black hover:bg-white/90">Save Changes</Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                  className="border-[#1a1b1e] hover:bg-white/5"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Request Release Modal */}
      <Dialog open={showReleaseModal} onOpenChange={setShowReleaseModal}>
        <DialogContent className="bg-[#101113] border-[#1a1b1e] max-w-lg">
          <DialogHeader>
            <DialogTitle>Request Milestone Release</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="milestone-evidence">Evidence Description</Label>
              <Textarea
                id="milestone-evidence"
                placeholder="Describe the work completed and provide evidence for milestone completion..."
                className="bg-[#0f1012] border-[#1a1b1e] min-h-[100px]"
              />
            </div>
            <div>
              <Label>Supporting Files</Label>
              <div className="border-2 border-dashed border-[#1a1b1e] rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-white/40" />
                <p className="text-sm text-white/60 mb-2">Upload screenshots, documents, or other evidence</p>
                <input type="file" multiple className="hidden" id="evidence-upload" />
                <Label
                  htmlFor="evidence-upload"
                  className="cursor-pointer inline-flex items-center px-3 py-1.5 text-xs border border-[#1a1b1e] rounded-md hover:bg-white/5"
                >
                  Choose files
                </Label>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button className="bg-white text-black hover:bg-white/90">Submit Request</Button>
              <Button
                variant="outline"
                onClick={() => setShowReleaseModal(false)}
                className="border-[#1a1b1e] hover:bg-white/5"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
