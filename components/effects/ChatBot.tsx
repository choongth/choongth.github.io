"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { personalData } from "@/lib/data"

interface Message {
  role: "user" | "bot"
  text: string
}

const faq = [
  {
    keywords: ["hello", "hi", "who are you", "introduce", "about"],
    response: `Hi! I'm Choong Ti Huai's AI assistant. Choong is an AI & Full-Stack Developer specializing in distributed systems and AI agent orchestration.`,
  },
  {
    keywords: ["skill", "tech", "stack", "technology", "what do you know"],
    response: "His stack includes Python, TypeScript, NestJS, FastAPI, LangGraph, LangChain, RAG pipelines, Next.js, React, Docker, and GCP Vertex AI.",
  },
  {
    keywords: ["project", "work", "portfolio", "github", "built"],
    response: `You can explore his projects on GitHub (github.com/choongth) — including an enterprise RAG platform, a Malaysian tourism AI assistant, and several open-source technical translations.`,
  },
  {
    keywords: ["contact", "email", "reach", "hire", "internship"],
    response: `You can reach Choong via the contact form on this page, or directly at ${personalData.email}. He's currently open to internship opportunities.`,
  },
  {
    keywords: ["publication", "translation", "blog", "article", "write"],
    response: "Choong has published Chinese translations of six technical books and research papers on software architecture, cloud patterns, event-driven systems, and distributed systems fundamentals.",
  },
  {
    keywords: ["education", "university", "degree", "study", "cgpa"],
    response: "He's pursuing a dual degree (BSc Computer Science) at Asia Pacific University & De Montfort University, Malaysia, with a CGPA of 3.82 and First Class Honours standing.",
  },
]

function getResponse(input: string): string {
  const lower = input.toLowerCase()
  for (const item of faq) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return item.response
    }
  }
  return "Great question! Feel free to use the contact form at the bottom of the page to reach Choong directly, or find him on GitHub."
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! How can I help you?" },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const userMsg: Message = { role: "user", text: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(userMsg.text) }])
    }, 600)
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border border-[hsla(0,0%,89%,0.12)] bg-card backdrop-blur-sm text-foreground hover:text-accent transition-all shadow-lg",
          open && "rotate-90"
        )}
        aria-label="AI Assistant"
        data-cursor-hover
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 h-[28rem] flex flex-col rounded-none border border-[hsla(0,0%,89%,0.12)] bg-card backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[hsla(0,0%,89%,0.08)]">
            <Bot className="w-5 h-5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">AI Assistant</span>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2 text-sm",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {m.role === "bot" && <Bot className="w-4 h-4 text-accent mt-1 shrink-0" />}
                <div
                  className={cn(
                    "max-w-[80%] px-3 py-2 border",
                    m.role === "user"
                      ? "bg-accent/10 border-accent/20 text-foreground"
                      : "bg-muted border-[hsla(0,0%,89%,0.08)] text-muted-foreground"
                  )}
                >
                  {m.text}
                </div>
                {m.role === "user" && <User className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 px-4 py-3 border-t border-[hsla(0,0%,89%,0.08)]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button onClick={send} className="text-accent hover:text-foreground transition-colors" aria-label="Send">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
