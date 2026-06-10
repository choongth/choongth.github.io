"use client"

import { useMemo } from "react"
import { SectionLabel } from "@/components/shared/SectionLabel"
import { VerticalText } from "@/components/shared/VerticalText"
import { BracketLabel } from "@/components/shared/BracketLabel"
import { skills } from "@/lib/data"

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
  const categories = useMemo(() => {
    const order: string[] = []
    const groups = new Map<string, typeof skills>()

    for (const skill of skills) {
      if (!groups.has(skill.category)) {
        order.push(skill.category)
        groups.set(skill.category, [])
      }
      groups.get(skill.category)!.push(skill)
    }

    return order.map((category) => ({
      category,
      meta: categoryCopy[category] ?? { title: category, summary: "", signal: "" },
      items: groups.get(category)!,
    }))
  }, [])

  return (
    <section id="techstack" className="magazine-page relative overflow-hidden px-6 py-24 lg:px-10">
      <div className="absolute inset-0 text-foreground/25 swiss-dots-fine pointer-events-none" />
      <VerticalText text="SKILLS" side="left" className="opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <SectionLabel number="06" title="TECH STACK" />
            <h2 className="font-editorial text-5xl font-black leading-[0.98] tracking-normal text-foreground md:text-6xl lg:text-7xl">
              Tech Stack
            </h2>
          </div>
          <div className="hidden border-l border-accent/70 pl-6 text-right lg:block">
            <span className="font-editorial-latin text-6xl font-bold leading-none text-accent">
              {String(skills.length).padStart(2, "0")}
            </span>
            <span className="mt-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
              Skills / {String(categories.length).padStart(2, "0")} categories
            </span>
          </div>
        </div>

        <div className="mt-16 columns-1 gap-6 md:columns-2 xl:columns-3">
          {categories.map(({ category, meta, items }, index) => (
            <div
              key={category}
              className="magazine-paper relative mb-6 break-inside-avoid overflow-hidden border border-foreground/10 p-6 lg:p-8"
            >
              <span className="pointer-events-none absolute -top-3 right-4 select-none font-editorial-latin text-6xl font-bold leading-none text-foreground/[0.06] lg:text-7xl">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <BracketLabel hover={false} className="text-accent">
                  {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </BracketLabel>
                <h3 className="mt-4 font-editorial text-2xl font-bold leading-tight text-foreground lg:text-3xl">
                  {meta.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {meta.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {meta.signal.split(" / ").map((tag) => (
                    <span key={tag} className="project-river-token">
                      {tag}
                    </span>
                  ))}
                </div>

                <ul className="mt-6 space-y-2.5 border-t border-foreground/10 pt-5">
                  {items.map((skill) => (
                    <li key={skill.name} className="flex items-baseline gap-2">
                      <span className="text-sm text-foreground/90">{skill.name}</span>
                      <span className="flex-1 border-b border-dotted border-foreground/20" />
                      <span className="font-mono text-[0.68rem] tabular-nums text-muted-foreground">
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
