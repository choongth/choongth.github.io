"use client"

import { ArrowUpRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { SectionLabel } from "@/components/shared/SectionLabel"
import { VerticalText } from "@/components/shared/VerticalText"
import { awards } from "@/lib/data"
import { cn } from "@/lib/utils"

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi"]

const scopeConfig: Record<string, { label: string; className: string }> = {
  National: {
    label: "NATIONAL",
    className: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  },
  International: {
    label: "INTERNATIONAL",
    className: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  },
  University: {
    label: "UNIVERSITY",
    className: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  },
}

export function Awards() {
  const sectionRef = useScrollAnimation({ selector: ".awards-content" })

  return (
    <section id="awards" ref={sectionRef} className="magazine-page relative px-6 py-32 lg:px-10 lg:py-40">
      <div className="absolute right-0 top-0 h-full w-1/3 text-foreground/25 swiss-dots-fine pointer-events-none" />
      <VerticalText text="AWARDS" side="left" className="opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="awards-content">
          <SectionLabel number="03" title="AWARDS" />
        </div>

        <div className="awards-content mt-4 mb-16">
          <h2 className="font-editorial text-5xl font-black leading-[0.98] tracking-normal text-foreground md:text-6xl lg:text-7xl">
            Awards &amp;
            <br />
            Recognition.
          </h2>
        </div>

        <div className="awards-content max-w-4xl">
          {awards.map((award, i) => {
            const scope = scopeConfig[award.scope]
            return (
              <a
                key={i}
                href={award.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-6 border-b border-foreground/10 py-8 first:border-t first:border-foreground/10 transition-colors hover:bg-foreground/[0.025] lg:gap-10"
                data-cursor-hover
              >
                <span className="w-6 shrink-0 font-mono text-sm italic text-muted-foreground/35 pt-0.5 select-none">
                  {ROMAN[i]}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="flex items-start gap-2 font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                    <span>{award.title}</span>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 -translate-y-0.5 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </p>
                  {award.project && (
                    <p className="mt-1.5 font-editorial text-base italic text-accent">
                      {award.project}
                    </p>
                  )}
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {award.description}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-2 pt-0.5">
                  <span
                    className={cn(
                      "font-mono text-[0.58rem] uppercase tracking-[0.12em] border px-2.5 py-1",
                      scope.className
                    )}
                  >
                    {scope.label}
                  </span>
                  <span className="font-mono text-[0.6rem] text-muted-foreground/50 tracking-widest">
                    {award.date}
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
