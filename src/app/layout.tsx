import type { Metadata, Viewport } from "next"
import "./globals.css"

const description =
  "Personal portfolio of Choong Ti Huai, an AI & Full-Stack Developer specializing in distributed systems and AI agent orchestration."

export const viewport: Viewport = {
  themeColor: "#f4f5f1",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: { default: "Choong Ti Huai | AI & Full-Stack Developer", template: "%s | Choong Ti Huai" },
  description,
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
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Choong Ti Huai | AI & Full-Stack Developer",
    description,
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap"
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
                  description,
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
