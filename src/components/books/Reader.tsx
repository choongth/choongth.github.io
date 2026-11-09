import Link from "next/link"
import { bookHref, type Book, type BookPage, type RenderedPage } from "@/lib/books"
import { profile } from "@/lib/data"
import { BookSearch } from "@/components/books/BookSearch"

function ChapterList({ book, currentSlug }: { book: Book; currentSlug?: string }) {
  const linkClass = (active: boolean, part: boolean) =>
    [
      "block rounded-lg px-2.5 py-1.5 leading-snug transition-colors",
      active ? "bg-lime font-medium text-ink" : "hover:bg-ground",
      part && !active ? "font-medium text-ink" : "",
      !part && !active ? "text-muted hover:text-ink" : "",
      part ? "mt-3" : "",
    ].join(" ")

  return (
    <ul className="text-sm">
      <li>
        <Link href={bookHref(book.slug)} prefetch={false} className={linkClass(!currentSlug, false)}>
          关于本书
        </Link>
      </li>
      {book.pages.map((page) => (
        <li key={page.slug}>
          <Link
            href={bookHref(book.slug, page.slug)}
            prefetch={false}
            aria-current={page.slug === currentSlug ? "page" : undefined}
            className={linkClass(page.slug === currentSlug, page.kind === "part")}
          >
            {page.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function PagerLink({ page, book, direction }: { page: BookPage; book: Book; direction: "prev" | "next" }) {
  return (
    <Link
      href={bookHref(book.slug, page.slug)}
      prefetch={false}
      className={`block rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-ink ${direction === "next" ? "text-right md:col-start-2" : ""}`}
    >
      <span className="block text-xs text-muted">{direction === "prev" ? "上一篇" : "下一篇"}</span>
      <span className="mt-1 block font-medium leading-snug">{page.title}</span>
    </Link>
  )
}

export function Reader({
  book,
  content,
  currentPage,
}: {
  book: Book
  content: RenderedPage
  currentPage?: BookPage
}) {
  const index = currentPage ? book.pages.findIndex((page) => page.slug === currentPage.slug) : -1
  const prev = index > 0 ? book.pages[index - 1] : undefined
  const next = book.pages[index + 1]
  const sourceFile = currentPage?.file ?? "README.md"
  const hasToc = content.toc.length >= 2

  return (
    // The root layout is English. Postbuild also sets <html lang> on these pages for search and SEO.
    <div lang="zh-Hans" className="mx-auto max-w-[1440px] px-4 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
          <Link href="/" lang="en" className="font-display text-[17px] font-bold hover:opacity-70">
            {profile.name}
          </Link>
          <Link href={bookHref(book.slug)} prefetch={false} className="text-sm text-muted hover:text-ink">
            {book.title}
          </Link>
        </div>
        <BookSearch book={book.slug} />
      </header>

      <details className="mb-4 rounded-2xl border border-line bg-surface lg:hidden">
        <summary className="cursor-pointer list-inside px-5 py-3 font-medium">目录</summary>
        <nav aria-label="章节目录" className="border-t border-line p-3">
          <ChapterList book={book} currentSlug={currentPage?.slug} />
        </nav>
      </details>

      <div className={`grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)] ${hasToc ? "xl:grid-cols-[290px_minmax(0,1fr)_220px]" : ""}`}>
        <aside className="hidden lg:block">
          <nav
            aria-label="章节目录"
            className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-line bg-surface p-3"
          >
            <ChapterList book={book} currentSlug={currentPage?.slug} />
          </nav>
        </aside>

        <main className="min-w-0 pb-20 pt-4">
          <div className="mx-auto max-w-[720px]">
            {!currentPage && book.pages[0] && (
              <Link
                href={bookHref(book.slug, book.pages[0].slug)}
                prefetch={false}
                className="mb-8 inline-flex min-h-12 items-center rounded-full bg-lime px-6 font-medium text-ink transition-opacity hover:opacity-80"
              >
                开始阅读 →
              </Link>
            )}
            <article
              data-pagefind-body
              data-pagefind-filter={`book:${book.slug}`}
              className="reader-prose"
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
            <nav aria-label="翻页" className="mt-14 grid gap-3 md:grid-cols-2">
              {prev && <PagerLink page={prev} book={book} direction="prev" />}
              {next && <PagerLink page={next} book={book} direction="next" />}
            </nav>
            <a
              href={`${book.repo}/blob/HEAD/${encodeURIComponent(sourceFile)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm text-muted underline decoration-line underline-offset-4 hover:text-ink"
            >
              在 GitHub 上查看本页或提交勘误 ↗
            </a>
          </div>
        </main>

        {hasToc && (
          <aside className="hidden xl:block">
            <nav aria-label="本页目录" className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto pt-4 text-sm">
              <p className="mb-3 font-medium">本页目录</p>
              <ul className="flex flex-col gap-2">
                {content.toc.map((entry) => (
                  <li key={entry.id} className={entry.level === 3 ? "pl-3" : ""}>
                    <a href={`#${entry.id}`} className="block leading-snug text-muted hover:text-ink">
                      {entry.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </div>
  )
}
