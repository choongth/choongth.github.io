// Next.js has one root layout, which declares the portfolio as English. The book pages are
// Chinese, so correct <html lang> in the exported files. Browsers and search engines read it,
// and Pagefind uses it to pick Chinese word segmentation, so this must run before indexing.
import fs from "node:fs"
import path from "node:path"

let updated = 0

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== "images") walk(target)
    } else if (entry.name.endsWith(".html")) {
      const html = fs.readFileSync(target, "utf8")
      if (!html.includes('<html lang="en"')) {
        throw new Error(`Expected <html lang="en"> in ${target}`)
      }
      fs.writeFileSync(target, html.replace('<html lang="en"', '<html lang="zh-Hans"'))
      updated += 1
    }
  }
}

walk(path.join("out", "books"))
console.log(`Set lang="zh-Hans" on ${updated} book pages`)
