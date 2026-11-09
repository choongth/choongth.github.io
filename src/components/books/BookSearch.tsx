"use client"

import { useRef, useState } from "react"

type PagefindResult = {
  url: string
  excerpt: string
  meta: { title?: string }
}

type Pagefind = {
  debouncedSearch: (
    query: string,
    options: { filters: Record<string, string> }
  ) => Promise<{ results: Array<{ data: () => Promise<PagefindResult> }> } | null>
}

type Status = "idle" | "searching" | "done" | "unavailable"

// Generated after the build, so it can't be bundled. It doesn't exist under `next dev`.
const PAGEFIND_URL = "/pagefind/pagefind.js"

export function BookSearch({ book }: { book: string }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<PagefindResult[]>([])
  const [status, setStatus] = useState<Status>("idle")
  const pagefindRef = useRef<Pagefind | null>(null)

  const search = async (value: string) => {
    setQuery(value)
    if (!value.trim()) {
      setResults([])
      setStatus("idle")
      return
    }

    setStatus("searching")
    try {
      pagefindRef.current ??= (await import(/* webpackIgnore: true */ PAGEFIND_URL)) as Pagefind
      const response = await pagefindRef.current.debouncedSearch(value, { filters: { book } })
      // null means a newer keystroke replaced this search.
      if (!response) return
      setResults(await Promise.all(response.results.slice(0, 8).map((result) => result.data())))
      setStatus("done")
    } catch {
      setStatus("unavailable")
    }
  }

  const clear = () => {
    setQuery("")
    setResults([])
    setStatus("idle")
  }

  return (
    <div
      className="relative w-full sm:w-72"
      onKeyDown={(event) => {
        if (event.key === "Escape") clear()
      }}
    >
      <label htmlFor="book-search" className="sr-only">
        搜索本书
      </label>
      <input
        id="book-search"
        type="search"
        value={query}
        onChange={(event) => search(event.target.value)}
        placeholder="搜索本书"
        autoComplete="off"
        className="h-11 w-full rounded-full border border-line bg-surface px-4 text-sm placeholder:text-muted"
      />
      {status !== "idle" && (
        <div className="absolute right-0 z-20 mt-2 max-h-[70vh] w-full overflow-y-auto rounded-2xl border border-line bg-surface p-2 shadow-lg sm:w-[28rem]">
          {status === "searching" && results.length === 0 && <p className="p-3 text-sm text-muted">正在搜索…</p>}
          {status === "unavailable" && <p className="p-3 text-sm text-muted">搜索暂时不可用。</p>}
          {status === "done" && results.length === 0 && <p className="p-3 text-sm text-muted">没有找到相关内容。</p>}
          <ul>
            {results.map((result) => (
              <li key={result.url}>
                <a href={result.url} className="block rounded-xl p-3 hover:bg-ground">
                  <span className="block text-sm font-medium">{result.meta.title}</span>
                  {/* Pagefind's excerpt: our own book text with <mark> around the matches. */}
                  <span
                    className="search-excerpt mt-1 block text-sm leading-relaxed text-muted"
                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
