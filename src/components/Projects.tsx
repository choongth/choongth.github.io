import Image from "next/image"
import { featuredProjects, otherProjects } from "@/lib/data"
import { SectionTitle } from "@/components/SectionTitle"

function ProjectTitle({ title, link }: { title: string; link?: string }) {
  if (!link) return title
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
      {title}
    </a>
  )
}

function TechLine({ technologies }: { technologies?: string[] }) {
  if (!technologies?.length) return null
  return <p className="mt-4 text-sm text-muted">{technologies.join(" · ")}</p>
}

function DemoLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-block text-sm font-medium text-lime-ink hover:underline"
    >
      Live demo ↗
    </a>
  )
}

export function Projects() {
  return (
    <section id="work" className="pb-[72px]">
      <SectionTitle>Selected work</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <article key={project.title} className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="relative aspect-[16/10] border-b border-line bg-ground">
              {project.image ? (
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-left-top"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-sm text-muted">
                  Screenshot coming soon
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-display text-[26px] font-medium leading-tight tracking-[-0.01em]">
                <ProjectTitle title={project.title} link={project.link} />
              </h3>
              <p className="mt-2 leading-relaxed">{project.description}</p>
              <TechLine technologies={project.technologies} />
              {project.demo && <DemoLink href={project.demo} />}
            </div>
          </article>
        ))}
      </div>
      {/* auto-fit: a single leftover project fills the row instead of leaving an empty cell. */}
      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-4">
        {otherProjects.map((project) => (
          <article key={project.title} className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-display text-[22px] font-medium leading-tight">
              <ProjectTitle title={project.title} link={project.link} />
            </h3>
            <p className="mt-2 leading-relaxed">{project.description}</p>
            <TechLine technologies={project.technologies} />
            {project.demo && <DemoLink href={project.demo} />}
          </article>
        ))}
      </div>
    </section>
  )
}
