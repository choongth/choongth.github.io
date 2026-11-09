import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "var(--ground)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        lime: "var(--lime)",
        "lime-ink": "var(--lime-ink)",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans SC", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Noto Sans SC", "system-ui", "sans-serif"],
      },
    },
  },
}

export default config
