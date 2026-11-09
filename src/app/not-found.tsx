import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[1240px] flex-col justify-center px-4 sm:px-6">
      <h1 className="font-display text-5xl font-bold tracking-tight sm:text-7xl">Page not found.</h1>
      <p className="mt-4 text-muted">This page doesn&apos;t exist or has been moved.</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 w-fit items-center rounded-full bg-lime px-6 font-medium text-ink hover:opacity-80"
      >
        Back to home
      </Link>
    </main>
  )
}
