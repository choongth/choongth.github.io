import { stack } from "@/lib/data"
import { SectionTitle } from "@/components/SectionTitle"

export function Stack() {
  return (
    <section id="stack" className="pb-[72px]">
      <SectionTitle>Stack</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => (
          <article key={group.category} className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-display text-[22px] font-medium leading-tight">{group.category}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-full bg-ground px-3 py-1 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
