"use client"

import { useEffect } from "react"
import Link from "next/link"
import { BracketLabel } from "@/components/shared/BracketLabel"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-6">
        <BracketLabel>ERROR</BracketLabel>
        <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Sorry, an unexpected error occurred. Try refreshing the page.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="font-mono text-sm uppercase tracking-[0.1em] text-accent hover:text-foreground transition-colors border-b border-accent pb-1"
          >
            [RETRY]
          </button>
          <Link
            href="/"
            className="font-mono text-sm uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
          >
            [HOME]
          </Link>
        </div>
      </div>
    </div>
  )
}
