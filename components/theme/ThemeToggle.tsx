"use client"

import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const cycle = () => {
    if (theme === "dark") setTheme("light")
    else if (theme === "light") setTheme("system")
    else setTheme("dark")
  }

  return (
    <button
      onClick={cycle}
      className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-accent transition-colors"
      aria-label={`Current theme: ${resolvedTheme}, click to toggle`}
      title={`Current: ${theme}`}
    >
      {resolvedTheme === "dark" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">
        {theme === "system" ? "[AUTO]" : resolvedTheme === "dark" ? "[DARK]" : "[LIGHT]"}
      </span>
    </button>
  )
}
