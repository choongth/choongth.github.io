"use client"

import { type CSSProperties, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { BrainCircuit, Layers3, Rotate3D, Sparkles } from "lucide-react"
import { SectionLabel } from "@/components/shared/SectionLabel"
import { VerticalText } from "@/components/shared/VerticalText"
import { BracketLabel } from "@/components/shared/BracketLabel"
import { skills } from "@/lib/data"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP)

const cardLayout = [
  { x: -8, y: 10, rotate: -8 },
  { x: 4, y: -4, rotate: 4 },
  { x: 10, y: 12, rotate: 9 },
  { x: -4, y: -10, rotate: -3 },
  { x: 14, y: -2, rotate: 7 },
  { x: -12, y: 0, rotate: -10 },
  { x: 2, y: 8, rotate: 2 },
  { x: -6, y: -8, rotate: -5 },
  { x: 12, y: 8, rotate: 11 },
  { x: -10, y: 12, rotate: -7 },
  { x: 6, y: -12, rotate: 5 },
  { x: 0, y: 2, rotate: -1 },
  { x: 15, y: -10, rotate: 8 },
  { x: -14, y: -4, rotate: -12 },
]

const categoryCopy: Record<string, { title: string; summary: string; signal: string }> = {
  Languages: {
    title: "Programming Languages",
    summary: "Core languages for building reliable, expressive systems across backend, frontend, and scripting contexts.",
    signal: "python / typescript / java",
  },
  Backend: {
    title: "Backend Engineering",
    summary: "Production-grade APIs, microservices, and data layers powering high-concurrency distributed systems.",
    signal: "service / api / storage",
  },
  "AI/Agent": {
    title: "AI & Agent Systems",
    summary: "Orchestrating models, tools, and memory into reliable, observable execution pipelines.",
    signal: "rag / tools / orchestration",
  },
  Frontend: {
    title: "Frontend Engineering",
    summary: "Translating complex systems into clear, interactive user experiences.",
    signal: "ui / motion / feedback",
  },
  "Cloud/Infra": {
    title: "Cloud & Infrastructure",
    summary: "Deploying, scaling, and observing distributed workloads on modern cloud platforms.",
    signal: "docker / gcp / kafka",
  },
  Databases: {
    title: "Databases",
    summary: "Relational, document, and vector stores — choosing the right persistence layer for the workload.",
    signal: "postgres / redis / mongo",
  },
  AWS: {
    title: "Amazon Web Services",
    summary: "Serverless functions, managed storage, queuing, and observability across the AWS ecosystem.",
    signal: "lambda / s3 / ec2",
  },
  Architecture: {
    title: "Architecture & Concepts",
    summary: "Distributed systems design, event-driven patterns, and the engineering fundamentals behind scalable software.",
    signal: "distributed / events / oop",
  },
  "Workflow/Automation": {
    title: "Workflow & Automation",
    summary: "AI orchestration, workflow orchestration, automation system.",
    signal: "n8n / coze / dify",
  },
}

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({})

  const deck = useMemo(
    () =>
      skills.map((skill, index) => ({
        ...skill,
        layout: cardLayout[index % cardLayout.length],
        meta: categoryCopy[skill.category] ?? categoryCopy["Languages"],
      })),
    []
  )

  const activeCard = deck[activeIndex]
  const activeRevealed = Boolean(revealedCards[activeCard.name])
  const revealedCount = Object.values(revealedCards).filter(Boolean).length

  useGSAP((context, contextSafe) => {
    const table = tableRef.current
    const cards = (context.selector?.(".tech-card") ?? []) as HTMLElement[]
    if (!table || cards.length === 0) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const safe = contextSafe ?? (<T extends (...args: any[]) => any>(fn: T) => fn)

    gsap.from(cards, {
      autoAlpha: 0,
      filter: prefersReduced ? "none" : "blur(10px)",
      stagger: 0.045,
      duration: prefersReduced ? 0 : 0.8,
      ease: "expo.out",
      clearProps: "filter",
    })

    const tiltX = gsap.quickTo(table, "--tilt-x", {
      duration: prefersReduced ? 0 : 0.42,
      ease: "power3.out",
    })
    const tiltY = gsap.quickTo(table, "--tilt-y", {
      duration: prefersReduced ? 0 : 0.42,
      ease: "power3.out",
    })

    const move = safe((event: PointerEvent) => {
      if (window.innerWidth < 1024) return
      const rect = table.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      tiltX(py * -7)
      tiltY(px * 9)
    })

    const leave = safe(() => {
      tiltX(0)
      tiltY(0)
    })

    table.addEventListener("pointermove", move)
    table.addEventListener("pointerleave", leave)

    return () => {
      table.removeEventListener("pointermove", move)
      table.removeEventListener("pointerleave", leave)
    }
  }, { scope: sectionRef })

  useGSAP(() => {
    gsap.fromTo(
      ".tech-dossier-current",
      { autoAlpha: 0, y: 18, rotateX: -8 },
      { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.42, ease: "expo.out" }
    )
  }, { dependencies: [activeIndex, activeRevealed], scope: sectionRef, revertOnUpdate: true })

  const revealCard = (index: number) => {
    const card = deck[index]
    setActiveIndex(index)
    setRevealedCards((current) => ({ ...current, [card.name]: true }))
  }

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="tech-card-table-section magazine-page relative min-h-screen overflow-hidden px-6 py-24 lg:px-10"
    >
      <div className="absolute inset-0 text-foreground/25 swiss-dots-fine pointer-events-none" />
      <VerticalText text="SKILLS" side="left" className="opacity-40" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <SectionLabel number="06" title="TECH STACK" />
            <h2 className="font-editorial text-5xl font-black leading-[0.98] tracking-normal text-foreground md:text-6xl lg:text-7xl">
              Tech Stack
            </h2>
          </div>
          <div className="hidden border-l border-accent/70 pl-6 text-right lg:block">
            <span className="font-editorial-latin text-6xl font-bold leading-none text-accent">
              {String(revealedCount).padStart(2, "0")}
            </span>
            <span className="mt-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
              / {String(deck.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div ref={tableRef} className="tech-card-table">
            <div className="tech-card-table-grid" aria-label="Tech cards">
              {deck.map((card, index) => {
                const revealed = Boolean(revealedCards[card.name])
                const active = index === activeIndex
                const level = `${card.level}%`

                return (
                  <button
                    key={card.name}
                    type="button"
                    className={cn("tech-card", revealed && "is-revealed", active && "is-active")}
                    style={{
                      "--card-x": `${card.layout.x}px`,
                      "--card-y": `${card.layout.y}px`,
                      "--card-rotate": `${card.layout.rotate}deg`,
                      "--level": level,
                    } as CSSProperties}
                    onClick={() => revealCard(index)}
                    aria-label={`Reveal ${card.name}`}
                    aria-pressed={revealed}
                    data-cursor-hover
                  >
                    <span className="tech-card-inner">
                      <span className="tech-card-face tech-card-back">
                        <span className="tech-card-back-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="tech-card-back-sigil">
                          <Rotate3D className="h-5 w-5" />
                        </span>
                        <span className="tech-card-back-category">{card.category}</span>
                      </span>
                      <span className="tech-card-face tech-card-front">
                        <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-accent">
                          {card.category}
                        </span>
                        <span className="tech-card-name">
                          {card.name}
                        </span>
                        <span className="tech-card-meter" aria-hidden="true">
                          <span />
                        </span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <aside className="tech-dossier" aria-live="polite">
            <div className="tech-dossier-grid" />
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center justify-between gap-4">
                <BracketLabel hover={false} className="text-accent">
                  CARD DOSSIER
                </BracketLabel>
                <Sparkles className="h-4 w-4 text-accent" />
              </div>

              <div className="tech-dossier-current mt-12">
                {activeRevealed ? (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="tech-dossier-icon">
                        {activeCard.category === "Agent" ? (
                          <BrainCircuit className="h-5 w-5" />
                        ) : (
                          <Layers3 className="h-5 w-5" />
                        )}
                      </span>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                        {activeCard.meta.title}
                      </span>
                    </div>
                    <h3 className="mt-8 font-editorial text-5xl font-semibold leading-none text-foreground">
                      {activeCard.name}
                    </h3>
                    <p className="mt-7 text-sm leading-7 text-muted-foreground">
                      {activeCard.meta.summary}
                    </p>
                    <div className="mt-10">
                      <div className="mb-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
                        <span>{activeCard.meta.signal}</span>
                        <span>{activeCard.level}</span>
                      </div>
                      <div className="tech-dossier-meter">
                        <span style={{ width: `${activeCard.level}%` }} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="tech-dossier-icon">
                      <Rotate3D className="h-5 w-5" />
                    </div>
                    <h3 className="mt-8 font-editorial text-5xl font-semibold leading-none text-foreground">
                      Dossier
                    </h3>
                    <p className="mt-7 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                      Locked / {String(deck.length).padStart(2, "0")} cards
                    </p>
                  </>
                )}
              </div>

              <div className="mt-auto pt-10">
                <div className="flex items-end justify-between">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Revealed
                  </span>
                  <span className="font-editorial-latin text-6xl font-bold leading-none text-accent">
                    {String(revealedCount).padStart(2, "0")}
                  </span>
                </div>
                <div className="tech-dossier-meter mt-4">
                  <span style={{ width: `${(revealedCount / deck.length) * 100}%` }} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
