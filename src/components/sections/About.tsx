"use client"

import { ArrowUpRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { SectionLabel } from "@/components/shared/SectionLabel"
import { VerticalText } from "@/components/shared/VerticalText"
import { BracketLabel } from "@/components/shared/BracketLabel"
import { personalInfo, currentlyBuilding } from "@/lib/data"

export function About() {
  const sectionRef = useScrollAnimation({ selector: ".about-content" })

  return (
    <section id="about" ref={sectionRef} className="magazine-page relative px-6 py-32 lg:px-10 lg:py-40">
      <div className="absolute right-0 top-0 h-full w-1/3 text-foreground/30 swiss-dots-fine pointer-events-none" />
      <VerticalText text="ABOUT" side="left" className="opacity-40" />

      <div className="max-w-7xl mx-auto">
        <div className="about-content">
          <SectionLabel number="01" title="ABOUT" />
        </div>

        <div className="grid gap-16 about-content lg:grid-cols-[minmax(0,1.05fr)_minmax(28rem,0.95fr)] lg:gap-24">
          <div>
            <h2 className="font-editorial mb-10 max-w-3xl text-5xl font-black leading-[0.98] tracking-normal text-foreground md:text-6xl lg:text-7xl">
              About Me, and How I Think About Problems.
            </h2>
            <div className="border-y border-foreground/12 py-8">
              <p className="max-w-2xl text-lg leading-9 text-foreground/82">
                {personalInfo.bio}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 border-b border-foreground/12 pb-10 sm:gap-8">
              {personalInfo.stats.map((stat) => (
                <div key={stat.label} className="border-l border-accent/45 pl-4">
                  <div className="font-editorial-latin text-4xl font-bold leading-none text-foreground lg:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="magazine-kicker mb-8 border-b border-foreground/12 pb-4">
              Now Building
            </h3>
            <div className="space-y-8">
              {currentlyBuilding.map((item) => (
                <div
                  key={item.title}
                  className="magazine-paper group border border-foreground/12 p-7 transition-colors hover:border-accent/40"
                >
                  <BracketLabel hover={false} className="text-accent">
                    {item.status}
                  </BracketLabel>
                  <h4 className="font-editorial mt-4 text-2xl font-semibold tracking-normal text-foreground">
                    {item.title}
                  </h4>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{item.role}</p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground/90">{item.description}</p>
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-5 space-y-3">
                      {item.highlights.map((point, idx) => (
                        <li key={idx} className="flex gap-3 text-sm leading-7 text-muted-foreground">
                          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span key={tech} className="project-river-token">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.collaborator && (
                    <a
                      href={item.collaborator.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-accent transition-colors hover:text-foreground"
                      data-cursor-hover
                    >
                      Built with @{item.collaborator.name}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
