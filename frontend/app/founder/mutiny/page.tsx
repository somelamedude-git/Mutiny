"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Send, Lightbulb, Users, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  from: "you" | "mutiny"
  text: string
  timestamp: string
  suggestions?: string[]
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    from: "mutiny",
    text: "Hi! I'm your AI co-pilot. I can help you refine ideas, find co-founders, plan milestones, and navigate funding. What would you like to work on today?",
    timestamp: "Just now",
    suggestions: [
      "Help me refine my Edge Vision Kit idea",
      "Find potential co-founders for my project",
      "Plan milestones for community funding",
      "Review my pitch deck",
    ],
  },
]

export default function FounderMutinyPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      from: "you",
      text: text.trim(),
      timestamp: "Just now",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          text: "That's a great direction! For the Edge Vision Kit, I'd suggest focusing on these key areas: 1) Define your target use case more specifically, 2) Identify the key technical differentiators, 3) Plan a clear go-to-market strategy. Would you like me to dive deeper into any of these?",
          suggestions: [
            "Help with technical differentiators",
            "Plan go-to-market strategy",
            "Find hardware co-founders",
          ],
        },
        {
          text: "I can help you find co-founders! Based on your Edge Vision Kit project, you'd benefit from someone with hardware experience and possibly someone with ML/computer vision expertise. I can suggest some profiles from our network or help you craft a co-founder search post.",
          suggestions: [
            "Show me potential co-founder profiles",
            "Help write co-founder search post",
            "What skills should I look for?",
          ],
        },
        {
          text: "For community funding milestones, I recommend breaking your project into 3-4 clear, measurable phases. Each milestone should have objective completion criteria and transparent budget allocation. Let me help you structure this properly.",
          suggestions: ["Structure my milestones", "Set milestone budgets", "Write milestone descriptions"],
        },
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        from: "mutiny",
        text: randomResponse.text,
        timestamp: "Just now",
        suggestions: randomResponse.suggestions,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion)
  }

  return (
    <div className="mx-auto max-w-[1000px] space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-[#101113] p-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#e3c27a] via-[#34d399] to-[#f472b6] grid place-items-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Mutiny AI</h1>
            <p className="text-sm text-white/70">Your co-pilot for ideas, team building, and funding</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card
          className="bg-[#101113] border-[#1a1b1e] hover:bg-[#101113]/80 transition-colors cursor-pointer"
          onClick={() => handleSend("Help me refine my current idea")}
        >
          <CardContent className="p-4 flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-white/60" />
            <div>
              <div className="font-medium text-sm">Refine ideas</div>
              <div className="text-xs text-white/60">Get feedback and direction</div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-[#101113] border-[#1a1b1e] hover:bg-[#101113]/80 transition-colors cursor-pointer"
          onClick={() => handleSend("Help me find co-founders")}
        >
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-5 w-5 text-white/60" />
            <div>
              <div className="font-medium text-sm">Find co-founders</div>
              <div className="text-xs text-white/60">Match with complementary skills</div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-[#101113] border-[#1a1b1e] hover:bg-[#101113]/80 transition-colors cursor-pointer"
          onClick={() => handleSend("Help me plan funding milestones")}
        >
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-white/60" />
            <div>
              <div className="font-medium text-sm">Plan funding</div>
              <div className="text-xs text-white/60">Structure milestones and budgets</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat interface */}
      <div className="rounded-xl bg-[#101113] overflow-hidden">
        {/* Messages */}
        <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.from === "you" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[80%] space-y-2")}>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm",
                    message.from === "you" ? "bg-white text-[#0b0b0c]" : "bg-[#1a1b1e] text-white",
                  )}
                >
                  {message.text}
                </div>

                {message.suggestions && (
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs rounded-full border border-white/10 bg-[#0f1012] px-3 py-1.5 text-white/80 hover:bg-white/[0.06] transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                <div className={cn("text-xs", message.from === "you" ? "text-right text-white/50" : "text-white/50")}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#1a1b1e] rounded-2xl px-4 py-3 text-sm text-white">
                <div className="flex items-center gap-1">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-white/60 rounded-full animate-bounce"></div>
                  </div>
                  <span className="ml-2 text-white/60">Mutiny is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-[#1a1b1e] p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(input)
            }}
            className="flex items-center gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Mutiny anything about your ideas, team, or funding..."
              className="flex-1 bg-[#0f1012] border-transparent text-white placeholder:text-white/40"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isTyping}
              className="bg-white text-[#0b0b0c] hover:bg-white/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
