import type { Metadata } from "next"
import { getBook, getBooks, renderBookPage } from "@/lib/books"
import { Reader } from "@/components/books/Reader"

type Props = { params: Promise<{ book: string; page: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getBooks().flatMap((book) => book.pages.map((page) => ({ book: book.slug, page: page.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book: bookSlug, page: pageSlug } = await params
  const book = getBook(bookSlug)
  const page = book.pages.find((candidate) => candidate.slug === pageSlug)
  return {
    title: `${page?.title} · ${book.title}`,
    description: `《${book.title}》中文译本：${page?.title}`,
  }
}

export default async function BookChapterPage({ params }: Props) {
  const { book: bookSlug, page: pageSlug } = await params
  const book = getBook(bookSlug)
  return (
    <Reader
      book={book}
      content={renderBookPage(bookSlug, pageSlug)}
      currentPage={book.pages.find((page) => page.slug === pageSlug)}
    />
  )
}
