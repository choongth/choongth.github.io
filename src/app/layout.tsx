import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { CustomCursor } from "@/components/effects/CustomCursor"
import { Toaster } from "@/components/ui/sonner"
import { ChatBot } from "@/components/effects/ChatBot"
import { MotionProgress } from "@/components/effects/MotionProgress"

export const viewport: Viewport = {
  themeColor: "#1b1b1b",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: { default: "Choong Ti Huai | AI & Full-Stack Developer", template: "%s | Choong Ti Huai" },
  description: "Personal portfolio of Choong Ti Huai — AI & Full-Stack Developer, Computer Science student specializing in distributed systems and AI agent orchestration.",
  keywords: ["AI Agent", "Full-Stack Developer", "Distributed Systems", "Next.js", "React", "TypeScript", "Choong Ti Huai", "portfolio"],
  authors: [{ name: "Choong Ti Huai" }],
  creator: "Choong Ti Huai",
  metadataBase: new URL("https://choongth.github.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Choong Ti Huai",
    title: "Choong Ti Huai | AI & Full-Stack Developer",
    description: "Personal portfolio — distributed systems, AI agent orchestration, and full-stack engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Choong Ti Huai | AI & Full-Stack Developer",
    description: "Personal portfolio — distributed systems, AI agent orchestration, and full-stack engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ ["--font-sans" as string]: "Inter, system-ui, -apple-system, sans-serif", ["--font-mono" as string]: "JetBrains Mono, ui-monospace, monospace" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Noto+Serif+SC:wght@500;600;700;900&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "Choong Ti Huai",
                  url: "https://choongth.github.io",
                  description: "Personal portfolio — distributed systems, AI agent orchestration, and full-stack engineering.",
                  inLanguage: "en-US",
                },
                {
                  "@type": "Person",
                  name: "Choong Ti Huai",
                  url: "https://choongth.github.io",
                  jobTitle: "AI & Full-Stack Developer",
                  sameAs: ["https://github.com/choongth", "https://linkedin.com/in/choong-ti-huai-41a2b3227"],
                  description: "Computer Science student specializing in distributed systems and AI agent orchestration.",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <CustomCursor />
        <Navbar />
        <MotionProgress />
        {children}
        <Toaster />
        <ChatBot />
      </body>
    </html>
  )
}
