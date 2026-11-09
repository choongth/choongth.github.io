import { awards } from "@/lib/data"
import { SectionTitle } from "@/components/SectionTitle"

export function Recognition() {
  return (
    <section className="pb-[72px]">
      <SectionTitle>Recognition</SectionTitle>
      <ul className="flex flex-col gap-3">
        {awards.map((award) => (
          <li key={award.title}>
            <a href={award.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {award.title}
            </a>
            <span className="block text-sm text-muted">{award.date}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
