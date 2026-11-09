import { profile } from "@/lib/data"

export function Hero() {
  return (
    <section id="top" className="pb-20 pt-12 sm:pt-[72px]">
      <h1 className="font-display text-[clamp(44px,7.5vw,96px)] font-bold leading-[1.12] tracking-[-0.035em]">
        Bridging AI models with{" "}
        {/* A gradient band, not a solid fill: an inline background taller than the line would cover descenders above it. */}
        <span className="bg-[linear-gradient(transparent_16%,var(--lime)_16%,var(--lime)_92%,transparent_92%)] px-[0.1em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] md:whitespace-nowrap">
          production-grade
        </span>{" "}
        backends.
      </h1>
      <p className="mt-10 max-w-[60ch] text-lg leading-relaxed text-muted">{profile.summary}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <a
          href="#work"
          className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-medium text-ground transition-opacity hover:opacity-80"
        >
          See the work
        </a>
        <p className="flex items-center gap-2 font-medium">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border border-ink bg-lime" />
          {profile.status}
        </p>
      </div>
    </section>
  )
}
