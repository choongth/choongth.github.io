import { profile } from "@/lib/data"

const links = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Books", href: "#books" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  return (
    <nav aria-label="Main" className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 text-sm">
      <a href="#top" className="font-display text-[17px] font-bold hover:opacity-70">
        {profile.name}
      </a>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-ink">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
