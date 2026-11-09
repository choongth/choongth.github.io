import fs from "node:fs"
import path from "node:path"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkCjkFriendly from "remark-cjk-friendly"
import { gfmTable } from "micromark-extension-gfm-table"
import { gfmTableFromMarkdown } from "mdast-util-gfm-table"
import { gfmFootnote } from "micromark-extension-gfm-footnote"
import { gfmFootnoteFromMarkdown } from "mdast-util-gfm-footnote"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import { toString } from "hast-util-to-string"
import type { Element, ElementContent, Root } from "hast"
import type { Processor } from "unified"

const CONTENT_DIR = path.join(process.cwd(), "content", "books")

const BOOKS = [
  {
    slug: "designing-event-driven-systems",
    repo: "https://github.com/choongth/Designing_Event-Driven_Systems_Chinese_Translated",
    // Each part page sits directly before this chapter number, as in the book's README.
    partStarts: [1, 5, 8, 11, 14],
  },
  {
    slug: "cloud-architecture-patterns",
    repo: "https://github.com/choongth/Cloud_Architecture_Patterns_Chinese_Translated",
    partStarts: [],
  },
  {
    slug: "software-architecture-patterns",
    repo: "https://github.com/choongth/Software_Architecture_Patterns_Chinese_Translated",
    partStarts: [],
  },
] as const

export type BookPage = {
  slug: string
  file: string
  title: string
  kind: "front" | "part" | "chapter" | "back"
}

export type Book = {
  slug: string
  repo: string
  title: string
  pages: BookPage[]
}

export type TocEntry = { id: string; text: string; level: 2 | 3 }

export type RenderedPage = {
  title: string
  html: string
  toc: TocEntry[]
}

const PART_NUMERALS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]

function readSource(bookSlug: string, file: string) {
  return fs.readFileSync(path.join(CONTENT_DIR, bookSlug, file), "utf8").replace(/\r\n/g, "\n")
}

function normalizeSpaces(text: string) {
  return text.replace(/[\s  ]+/g, " ").trim()
}

function readTitle(source: string, file: string) {
  const match = source.match(/^# (.+)$/m)
  if (!match) throw new Error(`No H1 title in ${file}`)
  return normalizeSpaces(match[1].replace(/&(emsp|ensp);/g, " "))
}

/** Maps a repo filename to its URL slug. Unknown files fail the build, so no page is dropped silently. */
function classify(file: string): { slug: string; kind: BookPage["kind"]; order: number } {
  const chapter = file.match(/^(\d{2})_/)
  if (chapter) return { slug: `ch-${chapter[1]}`, kind: "chapter", order: Number(chapter[1]) }
  if (file.startsWith("序言")) return { slug: "preface", kind: "front", order: 0 }
  if (file.startsWith("引言")) return { slug: "introduction", kind: "front", order: 0 }

  const part = file.match(/^第(.)部分/)
  if (part) {
    const number = PART_NUMERALS.indexOf(part[1]) + 1
    if (number > 0) return { slug: `part-${number}`, kind: "part", order: number }
  }

  const appendix = file.match(/^附录([A-Z])/)
  if (appendix) return { slug: `appendix-${appendix[1].toLowerCase()}`, kind: "back", order: 1 }
  if (file.startsWith("索引")) return { slug: "glossary", kind: "back", order: 2 }
  if (file.startsWith("作者简介")) return { slug: "author", kind: "back", order: 3 }

  throw new Error(`Don't know where ${file} belongs in the book`)
}

const bookCache = new Map<string, Book>()

export function getBook(slug: string): Book {
  const cached = bookCache.get(slug)
  if (cached) return cached

  const config = BOOKS.find((book) => book.slug === slug)
  if (!config) throw new Error(`Unknown book: ${slug}`)

  const dir = path.join(CONTENT_DIR, slug)
  if (!fs.existsSync(path.join(dir, "README.md"))) {
    throw new Error(`Book content is missing. Run: git submodule update --init (looked in ${dir})`)
  }

  const entries = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md") && file !== "README.md")
    .map((file) => {
      const { order, ...rest } = classify(file)
      return { ...rest, order, file, title: readTitle(readSource(slug, file), file) }
    })

  const ofKind = (kind: BookPage["kind"]) =>
    entries.filter((entry) => entry.kind === kind).sort((a, b) => a.order - b.order)
  const partPages = ofKind("part")

  const pages: BookPage[] = [...ofKind("front")]
  for (const chapter of ofKind("chapter")) {
    const partIndex = (config.partStarts as readonly number[]).indexOf(chapter.order)
    if (partIndex >= 0) pages.push(partPages[partIndex])
    pages.push(chapter)
  }
  pages.push(...ofKind("back"))

  const book: Book = {
    slug,
    repo: config.repo,
    title: readTitle(readSource(slug, "README.md"), "README.md"),
    pages: pages.map(({ slug, file, title, kind }) => ({ slug, file, title, kind })),
  }
  bookCache.set(slug, book)
  return book
}

export function getBooks() {
  return BOOKS.map((book) => getBook(book.slug))
}

export function bookHref(bookSlug: string, pageSlug?: string) {
  return pageSlug ? `/books/${bookSlug}/${pageSlug}/` : `/books/${bookSlug}/`
}

const isElement = (node: unknown, tag?: string): node is Element =>
  typeof node === "object" &&
  node !== null &&
  (node as Element).type === "element" &&
  (!tag || (node as Element).tagName === tag)

const isBlankText = (node: ElementContent) => node.type === "text" && !node.value.trim()

function findAll(node: Element | Root, tag: string): Element[] {
  const found: Element[] = []
  for (const child of node.children) {
    if (!isElement(child)) continue
    if (child.tagName === tag) found.push(child)
    found.push(...findAll(child, tag))
  }
  return found
}

function element(tagName: string, className: string | null, children: ElementContent[]): Element {
  return { type: "element", tagName, properties: className ? { className: className.split(" ") } : {}, children }
}

/**
 * GFM tables and footnotes only, not the whole of remark-gfm. Its autolinking treats Chinese text
 * as part of a URL, so "http://a.com）、列出…" links the rest of the sentence. See linkify() instead.
 */
function remarkGfmSubset(this: Processor) {
  const data = this.data()
  ;(data.micromarkExtensions ??= []).push(gfmTable(), gfmFootnote())
  ;(data.fromMarkdownExtensions ??= []).push(gfmTableFromMarkdown(), gfmFootnoteFromMarkdown())
}

const URL_PATTERN = /(?:https?:\/\/|www\.)[A-Za-z0-9\-._~:/?#[\]@!$&'()+,;=%]+/g

function externalLink(href: string, text: string): Element {
  return {
    type: "element",
    tagName: "a",
    properties: { href, target: "_blank", rel: ["noopener", "noreferrer"] },
    children: [{ type: "text", value: text }],
  }
}

/** Turns bare URLs into links, ending each URL at the first character that can't be in one. */
function linkify(value: string): ElementContent[] {
  const nodes: ElementContent[] = []
  let cursor = 0
  for (const match of value.matchAll(URL_PATTERN)) {
    const url = match[0].replace(/[.,;:!?'")\]]+$/, "")
    if (match.index > cursor) nodes.push({ type: "text", value: value.slice(cursor, match.index) })
    nodes.push(externalLink(url.startsWith("www.") ? `https://${url}` : url, url))
    cursor = match.index + url.length
  }
  if (cursor === 0) return [{ type: "text", value }]
  if (cursor < value.length) nodes.push({ type: "text", value: value.slice(cursor) })
  return nodes
}

const CALLOUTS = [
  { match: "blue", kind: "tip", label: "提示" },
  { match: "red", kind: "warning", label: "注意" },
  { match: "note", kind: "note", label: "说明" },
]

/** Rewrites the HTML conventions used in the book repos into semantic markup. */
function rehypeBookMarkup(book: Book) {
  const fileToHref = new Map<string, string>(book.pages.map((page) => [page.file, bookHref(book.slug, page.slug)]))
  fileToHref.set("README.md", bookHref(book.slug))

  const rewriteHref = (href: string) => {
    if (/^(https?:|mailto:)/.test(href)) return { href, external: true }
    if (href.startsWith("#")) return { href, external: false }

    const [rawPath, fragment] = href.split("#")
    const target = decodeURIComponent(rawPath).replace(/^\.\//, "")
    const internal = fileToHref.get(target)
    if (internal) return { href: fragment ? `${internal}#${fragment}` : internal, external: false }

    // English originals and other repo files are not part of the reader, so point at GitHub.
    return { href: `${book.repo}/blob/HEAD/${rawPath.replace(/^\.\//, "")}`, external: true }
  }

  const rewriteImage = (src: string) =>
    /^https?:/.test(src) ? src : `/books/${book.slug}/${src.replace(/^\.\//, "")}`

  const buildFigure = (node: Element): Element => {
    const images = findAll(node, "img")
    const captionParagraph = node.children.find(
      (child) => isElement(child, "p") && findAll(child, "img").length === 0 && toString(child).trim()
    ) as Element | undefined
    const captionText = captionParagraph ? toString(captionParagraph).trim() : ""
    const captionContent =
      captionParagraph?.children.length === 1 && isElement(captionParagraph.children[0], "em")
        ? captionParagraph.children[0].children
        : captionParagraph?.children

    const figureChildren: ElementContent[] = images.map((image) => ({
      ...image,
      properties: {
        src: rewriteImage(String(image.properties.src ?? "")),
        alt: captionText || "插图",
        loading: "lazy",
      },
    }))
    if (captionContent) figureChildren.push(element("figcaption", null, transform(captionContent, false)))
    return element("figure", null, figureChildren)
  }

  const buildCallouts = (table: Element): Element[] | null => {
    const callouts: Element[] = []
    for (const row of findAll(table, "tr")) {
      const cells = row.children.filter((child): child is Element => isElement(child, "td"))
      const icon = cells[0] && findAll(cells[0], "img")[0]
      if (!icon || !cells[1]) return null
      const type = CALLOUTS.find((callout) => String(icon.properties.src).includes(callout.match))
      if (!type) return null
      callouts.push(
        element("aside", `callout callout-${type.kind}`, [
          element("p", "callout-label", [{ type: "text", value: type.label }]),
          element("div", "callout-body", trimBlankEdges(transform(cells[1].children, true))),
        ])
      )
    }
    return callouts.length > 0 ? callouts : null
  }

  const trimBlankEdges = (nodes: ElementContent[]) => {
    const list = [...nodes]
    while (list[0] && isBlankText(list[0])) list.shift()
    while (list.at(-1) && isBlankText(list.at(-1)!)) list.pop()
    return list.map((node, index) =>
      node.type === "text" && (index === 0 || index === list.length - 1)
        ? { ...node, value: node.value.trim() }
        : node
    )
  }

  const stripIndents = (paragraph: Element) => {
    paragraph.children.forEach((child, index) => {
      if (child.type !== "text") return
      // These repos indent lines with &emsp;, which leaves stray gaps once typeset as a web page.
      child.value = child.value.replace(/\n[   ]+/g, "\n")
      if (index === 0) child.value = child.value.replace(/^[\s  ]+/, "")
    })
  }

  const dedentCode = (code: Element) => {
    const text = toString(code).replace(/\n$/, "")
    const lines = text.split("\n")
    const indents = lines.filter((line) => line.trim()).map((line) => line.match(/^ */)![0].length)
    const indent = indents.length > 0 ? Math.min(...indents) : 0
    code.children = [{ type: "text", value: lines.map((line) => line.slice(indent)).join("\n") }]
  }

  function transform(children: ElementContent[], block: boolean): ElementContent[] {
    const output: ElementContent[] = []

    for (const child of children) {
      if (!isElement(child)) {
        if (child.type === "text") output.push(...linkify(child.value))
        else output.push(child)
        continue
      }

      const align = child.properties.align
      delete child.properties.align

      // <br> between blocks is only used as vertical spacing in the repos.
      if (child.tagName === "br" && block) continue

      if (child.tagName === "div" && align) {
        if (align === "center" && findAll(child, "img").length > 0) output.push(buildFigure(child))
        else output.push(...transform(child.children, block))
        continue
      }

      if (child.tagName === "table") {
        const callouts = buildCallouts(child)
        if (callouts) {
          output.push(...callouts)
          continue
        }
        child.children = transform(child.children, false)
        output.push(element("div", "table-scroll", [child]))
        continue
      }

      if (child.tagName === "blockquote") {
        const first = child.children.find((node) => !isBlankText(node))
        child.children = transform(child.children, true)
        if (isElement(first, "h3")) {
          output.push(element("aside", "boxout", child.children))
          continue
        }
        output.push(child)
        continue
      }

      if (child.tagName === "pre") {
        const code = child.children.find((node) => isElement(node, "code"))
        if (isElement(code)) dedentCode(code)
        output.push(child)
        continue
      }

      if (child.tagName === "a") {
        const { href, external } = rewriteHref(String(child.properties.href ?? ""))
        child.properties.href = href
        if (external) {
          child.properties.target = "_blank"
          child.properties.rel = ["noopener", "noreferrer"]
        }
        // Not recursing: a link's text must not be linkified again.
        output.push(child)
        continue
      }

      if (child.tagName === "code") {
        output.push(child)
        continue
      }

      if (child.tagName === "img") {
        const alt = String(child.properties.alt ?? "")
        child.properties = {
          src: rewriteImage(String(child.properties.src ?? "")),
          alt: alt === "Local Image" ? "" : alt,
          loading: "lazy",
        }
      }

      if (child.tagName === "p") {
        stripIndents(child)
        child.children = transform(child.children, false)
        const hasContent = child.children.some(
          (node) => !isBlankText(node) && !isElement(node, "br")
        )
        if (hasContent) output.push(child)
        continue
      }

      if (child.tagName === "h1") {
        for (const node of child.children) {
          if (node.type === "text") node.value = node.value.replace(/[   ]+/g, " ")
        }
      }

      const blockParent = ["li", "td", "th", "section"].includes(child.tagName)
      child.children = transform(child.children, blockParent)
      output.push(child)
    }

    return output
  }

  return (tree: Root) => {
    tree.children = transform(tree.children as ElementContent[], true) as Root["children"]
  }
}

function collectToc(tree: Root): TocEntry[] {
  return tree.children.flatMap((node): TocEntry[] => {
    if (!isElement(node)) return []
    if (node.tagName !== "h2" && node.tagName !== "h3") return []
    return [
      {
        id: String(node.properties.id),
        text: normalizeSpaces(toString(node)),
        level: node.tagName === "h2" ? 2 : 3,
      },
    ]
  })
}

function renderMarkdown(book: Book, source: string) {
  let toc: TocEntry[] = []
  const html = unified()
    .use(remarkParse)
    // CommonMark won't close *emphasis* between Chinese punctuation and a letter, as in *《书名》*一书.
    .use(remarkCjkFriendly)
    .use(remarkGfmSubset)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      footnoteLabel: "脚注",
      footnoteLabelProperties: { className: ["footnotes-title"] },
      footnoteBackLabel: "返回正文",
    })
    .use(rehypeRaw)
    .use(rehypeBookMarkup, book)
    .use(rehypeSlug)
    .use(() => (tree: Root) => {
      toc = collectToc(tree)
    })
    .use(rehypeStringify)
    .processSync(source)
    .toString()
  return { html, toc }
}

export function renderBookPage(bookSlug: string, pageSlug: string): RenderedPage {
  const book = getBook(bookSlug)
  const page = book.pages.find((candidate) => candidate.slug === pageSlug)
  if (!page) throw new Error(`Unknown page ${pageSlug} in ${bookSlug}`)
  return { title: page.title, ...renderMarkdown(book, readSource(bookSlug, page.file)) }
}

export function renderBookHome(bookSlug: string): RenderedPage {
  const book = getBook(bookSlug)
  return { title: book.title, ...renderMarkdown(book, readSource(bookSlug, "README.md")) }
}
