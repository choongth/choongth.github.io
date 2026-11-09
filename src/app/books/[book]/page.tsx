import type { Metadata } from "next"
import { getBook, getBooks, renderBookHome } from "@/lib/books"
import { Reader } from "@/components/books/Reader"

type Props = { params: Promise<{ book: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getBooks().map((book) => ({ book: book.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book: slug } = await params
  const book = getBook(slug)
  return {
    title: `${book.title}（中文译本）`,
    description: `《${book.title}》中文全译本，可在线免费阅读。`,
  }
}

export default async function BookHomePage({ params }: Props) {
  const { book: slug } = await params
  return <Reader book={getBook(slug)} content={renderBookHome(slug)} />
}
