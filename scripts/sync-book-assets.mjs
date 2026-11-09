// Copies each book's images into public/ so the static site can serve them.
// Runs before `next dev` and `next build`. The output is gitignored.
import fs from "node:fs"
import path from "node:path"

const contentDir = path.join("content", "books")
const outputDir = path.join("public", "books")

// Cover scans aren't used by the reader, and one of them is 2.7 MB.
const SKIPPED = new Set(["cover_page.png"])

const books = fs.existsSync(contentDir) ? fs.readdirSync(contentDir) : []
const missing = books.filter((book) => !fs.existsSync(path.join(contentDir, book, "README.md")))
if (books.length === 0 || missing.length > 0) {
  console.error("Book content is missing. Run: git submodule update --init")
  process.exit(1)
}

fs.rmSync(outputDir, { recursive: true, force: true })
for (const book of books) {
  fs.cpSync(path.join(contentDir, book, "images"), path.join(outputDir, book, "images"), {
    recursive: true,
    filter: (source) => !SKIPPED.has(path.basename(source)),
  })
}
console.log(`Synced images for ${books.length} books`)
