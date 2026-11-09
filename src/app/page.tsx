import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Projects } from "@/components/Projects"
import { Experience } from "@/components/Experience"
import { Books } from "@/components/Books"
import { Recognition } from "@/components/Recognition"
import { Stack } from "@/components/Stack"
import { Contact } from "@/components/Contact"

export default function Home() {
  return (
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Books />
        <Recognition />
        <Stack />
      </main>
      <Contact />
    </div>
  )
}
