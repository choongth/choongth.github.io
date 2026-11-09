import { education, experiences, nowBuilding } from "@/lib/data"
import { SectionTitle } from "@/components/SectionTitle"

export function Experience() {
  return (
    <section id="experience" className="pb-[72px]">
      <SectionTitle>Experience</SectionTitle>
      <div className="flex flex-col gap-4">
        {experiences.map((exp) => (
          <article key={exp.company} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap justify-between gap-x-6 gap-y-1">
              <h3 className="font-display text-[26px] font-medium leading-tight">
                {exp.role}, {exp.company}
              </h3>
              <span className="text-muted">{exp.period}</span>
            </div>
            <p className="mt-3 max-w-[68ch] leading-relaxed">{exp.description}</p>
            {exp.link && (
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-lime-ink hover:underline"
              >
                View repository ↗
              </a>
            )}
            {exp.metrics && (
              <dl className="mt-8 grid gap-6 md:grid-cols-3">
                {exp.metrics.map((metric) => (
                  <div key={metric.value} className="flex flex-col-reverse justify-end">
                    <dt className="mt-2 text-sm leading-snug text-muted">{metric.label}</dt>
                    <dd className="font-display text-5xl font-bold leading-none tracking-[-0.02em] text-lime-ink">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            {exp.highlights && (
              <ul className="mt-8 flex max-w-[84ch] list-disc flex-col gap-3 border-t border-line pl-5 pt-6 leading-relaxed marker:text-lime-ink">
                {exp.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-sm text-muted">Now building · {nowBuilding.status}</p>
          <h3 className="mt-1 font-display text-[22px] font-medium">{nowBuilding.title}</h3>
          <p className="mt-2 leading-relaxed">{nowBuilding.description}</p>
          <a
            href={nowBuilding.collaborator.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-lime-ink hover:underline"
          >
            Built with @{nowBuilding.collaborator.name} ↗
          </a>
        </article>
        <article className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-sm text-muted">Education</p>
          <h3 className="mt-1 font-display text-[22px] font-medium">{education.degree}</h3>
          <p className="mt-2 leading-relaxed">{education.school}</p>
          <p className="mt-3 text-sm font-medium">CGPA {education.cgpa}</p>
        </article>
      </div>
    </section>
  )
}
