import { MetadataRoute } from "next"
import { bookHref, getBooks } from "@/lib/books"

export const dynamic = "force-static"

const SITE_URL = "https://choongth.github.io"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const bookUrls = getBooks().flatMap((book) => [
    bookHref(book.slug),
    ...book.pages.map((page) => bookHref(book.slug, page.slug)),
  ])

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    ...bookUrls.map((url) => ({
      url: `${SITE_URL}${url}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
