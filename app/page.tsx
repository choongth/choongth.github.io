import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Projects } from "@/components/sections/Projects"
import { TechStack } from "@/components/sections/TechStack"
import { Publications } from "@/components/sections/Publications"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: "Choong Ti Huai | AI & Full-Stack Developer",
  description: "Personal portfolio of Choong Ti Huai — AI & Full-Stack Developer specializing in distributed systems and AI agent orchestration.",
  openGraph: {
    url: "https://choongth.github.io",
    title: "Choong Ti Huai | AI & Full-Stack Developer",
    description: "Personal portfolio — distributed systems, AI agent orchestration, and full-stack engineering.",
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Publications />
      <Contact />
      <Footer />
    </main>
  )
}
