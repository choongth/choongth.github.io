import { profile } from "@/lib/data"

export function Contact() {
  return (
    <footer id="contact" className="border-t border-line pb-[72px] pt-10">
      <a
        href={`mailto:${profile.email}`}
        className="font-display text-[clamp(26px,5vw,60px)] font-bold tracking-[-0.03em] [overflow-wrap:anywhere] hover:underline"
      >
        {profile.email}
      </a>
      <div className="mt-5 flex gap-6 text-muted">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
          LinkedIn
        </a>
      </div>
    </footer>
  )
}
