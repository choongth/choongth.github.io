import Link from "next/link"
import { books, papers } from "@/lib/data"
import { SectionTitle } from "@/components/SectionTitle"

const cardStyles = [
  "bg-lime text-ink",
  "bg-ink text-ground",
  "border border-line bg-surface text-ink",
]

export function Books() {
  return (
    <section id="books" className="pb-[72px]">
      <SectionTitle>Books I translated into Chinese, free to read</SectionTitle>
      <div className="grid gap-4 md:grid-cols-3">
        {books.map((book, index) => (
          <Link
            key={book.title}
            href={book.link}
            className={`flex min-h-60 flex-col justify-between gap-12 rounded-2xl p-6 transition-transform hover:-translate-y-1 ${cardStyles[index % cardStyles.length]}`}
          >
            <span className="font-display text-[30px] font-bold leading-[1.08] tracking-[-0.02em]">
              {book.title}
            </span>
            <span className="font-medium">{book.chapters} chapters · Read online →</span>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        <span className="text-muted">Translated papers:</span>
        {papers.map((paper) => (
          <a
            key={paper.title}
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            {paper.title}
          </a>
        ))}
      </div>
    </section>
  )
}
