"use client"

import { ArrowUpRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { SectionLabel } from "@/components/shared/SectionLabel"
import { BracketLabel } from "@/components/shared/BracketLabel"
import { VerticalText } from "@/components/shared/VerticalText"
import { experiences } from "@/lib/data"

export function Experience() {
  const sectionRef = useScrollAnimation({ selector: ".experience-content" })

  return (
    <section id="experience" ref={sectionRef} className="magazine-page relative px-6 py-32 lg:px-10 lg:py-40">
      <div className="absolute left-0 top-0 h-full w-1/3 text-foreground/25 swiss-dots-fine pointer-events-none" />
      <VerticalText text="EXPERIENCE" side="right" className="opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="experience-content">
          <SectionLabel number="02" title="EXPERIENCE" />
        </div>

        <div className="experience-content mt-4">
          <h2 className="font-editorial mb-16 text-5xl font-black leading-[0.98] tracking-normal text-foreground md:text-6xl lg:text-7xl">
            Where I&apos;ve
            <br />
            Applied It.
          </h2>
        </div>

        <div className="experience-content relative">
          {experiences.length > 0 ? (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-px bg-accent/30" />
              <div className="space-y-0">
                {experiences.map((exp, i) => (
                  <div key={i} className="group relative pl-12 pb-16 last:pb-0">
                    <div className="absolute left-0 top-2 h-3 w-3 -translate-x-1/2 bg-background ring-2 ring-accent/60 group-hover:bg-accent group-hover:ring-accent transition-colors duration-300" />

                    <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
                      <div>
                        <BracketLabel hover={false} className="text-accent text-xs mb-3">
                          {exp.period}
                        </BracketLabel>
                        <h3 className="font-editorial text-2xl font-semibold tracking-normal text-foreground leading-snug">
                          {exp.company}
                        </h3>
                        <p className="font-mono text-xs text-muted-foreground mt-2 leading-relaxed">
                          {exp.role}
                        </p>
                      </div>

                      <div className="border-l border-foreground/10 pl-8 lg:pl-12">
                        <p className="text-base leading-8 text-foreground/75">
                          {exp.description}
                        </p>
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="mt-5 space-y-3">
                            {exp.highlights.map((point, idx) => (
                              <li key={idx} className="flex gap-3 text-sm leading-7 text-muted-foreground">
                                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-accent hover:text-foreground transition-colors"
                            data-cursor-hover
                          >
                            View Repository
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="magazine-paper border border-foreground/12 p-7">
              <BracketLabel hover={false} className="text-accent">
                NO FORMAL EXPERIENCE YET
              </BracketLabel>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                No fabricated experience here. This space is reserved for real internships, project collaborations, and verifiable engineering records.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
