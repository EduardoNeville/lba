// Locale coverage for every dictionary in src/data/locales (discovered, not listed —
// see scripts/locale-registry.ts).
//
//   npm run check:locales                 fails on gaps, so CI/build can rely on it
//   npm run check:locales -- --allow-gaps reports gaps, fails only on structure
//
// Structural errors (always a failure): a key fr/es has that en does not, a key whose
// shape differs between languages, a dictionary with no `en`, an array whose length
// differs from en's. Gaps (a key en has and fr/es does not) also fail by default:
// fr/es fall back to English per key, so a gap means the page silently shows English.
//
// It also lists copy it can see living outside the dictionaries — string literals in
// pages and components. That is a hint for a human, never a failure.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadDictionaries } from './locale-registry.ts'

type Kind = 'string' | 'array' | 'object' | 'other'
const kind = (v: unknown): Kind =>
  typeof v === 'string' ? 'string' : Array.isArray(v) ? 'array' : v && typeof v === 'object' ? 'object' : 'other'

/** Leaf keys of an object tree (arrays compared as a single leaf, then by length). */
function leaves(obj: unknown, prefix = ''): Map<string, Kind> {
  const out = new Map<string, Kind>()
  if (kind(obj) !== 'object') {
    if (prefix) out.set(prefix, kind(obj))
    return out
  }
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const p = prefix ? `${prefix}.${k}` : k
    for (const [key, t] of leaves(v, p)) out.set(key, t)
  }
  return out
}

/** Every array in the tree, by path, with its length — element counts are copy too. */
function arrays(obj: unknown, prefix = ''): Map<string, number> {
  const out = new Map<string, number>()
  if (kind(obj) === 'array') {
    out.set(prefix, (obj as unknown[]).length)
    return out
  }
  if (kind(obj) === 'object') {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      const p = prefix ? `${prefix}.${k}` : k
      for (const [key, n] of arrays(v, p)) out.set(key, n)
    }
  }
  return out
}

const allowGaps = process.argv.includes('--allow-gaps')
const dictionaries = await loadDictionaries()

let errors = 0
let gaps = 0

console.log(`${dictionaries.length} dictionaries, ${allowGaps ? 'gaps reported' : 'gaps fail the check'}\n`)

for (const { name, en, fr, es } of dictionaries) {
  const enLeaves = leaves(en)
  const enArrays = arrays(en)
  const notes: string[] = []

  for (const [langName, other] of [['fr', fr], ['es', es]] as const) {
    const otherLeaves = leaves(other)

    for (const [p, t] of otherLeaves) {
      const enType = enLeaves.get(p)
      if (enType === undefined) {
        console.error(`✗ ${name}: ${langName}.${p} is not in en (orphan key)`)
        errors++
      } else if (enType !== t) {
        console.error(`✗ ${name}: ${langName}.${p} is ${t}, en has ${enType}`)
        errors++
      }
    }

    const missing: string[] = []
    for (const p of enLeaves.keys()) {
      if (!otherLeaves.has(p)) missing.push(p)
    }

    if (missing.length) {
      gaps += missing.length
      if (allowGaps) {
        console.warn(`· ${name}: ${langName} is missing ${missing.length} — falls back to en`)
        for (const p of missing.slice(0, 8)) console.warn(`    ${langName}.${p}`)
        if (missing.length > 8) console.warn(`    … and ${missing.length - 8} more`)
      } else {
        for (const p of missing) console.error(`✗ ${name}: ${langName}.${p} untranslated (page would show English)`)
        errors += missing.length
      }
    }

    for (const [p, n] of arrays(other)) {
      const enN = enArrays.get(p)
      if (enN !== undefined && enN !== n) {
        console.error(`✗ ${name}: ${langName}.${p} has ${n} entries, en has ${enN}`)
        errors++
      }
    }

    notes.push(`${langName} ${otherLeaves.size}/${enLeaves.size}`)
  }

  const ok = notes.every((n) => n.endsWith(`/${enLeaves.size}`))
  console.log(`${ok ? '✓' : '·'} ${name.padEnd(22)} en ${String(enLeaves.size).padStart(3)} keys   ${notes.join('   ')}`)
}

// ---------------------------------------------------------------------------------
// Copy that lives outside the dictionaries. Nothing here fails the check: it lists
// what a dictionary cannot see, so a human can decide whether it belongs in one.
const SRC = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../src')
const BRANDS = /^(Instagram|LinkedIn|WhatsApp|Legal Boutique Advisers)/

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (statSync(full).isDirectory()) {
      if (entry === 'admin' || entry === 'assets') continue
      walk(full, out)
    } else if (full.endsWith('.tsx')) out.push(full)
  }
  return out
}

interface Hit {
  file: string
  line: number
  text: string
}
const hits: Hit[] = []
const PATTERNS: RegExp[] = [
  /aria-label="([^"]*[A-Za-z]{2}[^"]*)"/g, // literal aria-labels
  /\b(?:label|heading|subline|placeholder|title):\s*'([^']{4,})'/g, // copy passed as a prop
  /^\s{6,}([A-Z][a-z]+(?: [a-z,'’&→-]+){1,8})\s*$/gm, // bare text inside JSX
]

for (const file of walk(SRC)) {
  const rel = path.relative(SRC, file)
  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, i) => {
    for (const re of PATTERNS) {
      re.lastIndex = 0
      for (const m of line.matchAll(re)) {
        const text = (m[1] ?? '').trim()
        if (!text || BRANDS.test(text)) continue
        hits.push({ file: rel, line: i + 1, text })
      }
    }
  })
}

// Deliberately outside the dictionaries, so they are not re-reported forever:
//  · App.tsx holds the per-route SEO titles. The site is one URL per page and switches
//    language in the browser, so crawlers see one language — localising these belongs
//    with per-language URLs and hreflang, not with the dictionaries.
//  · the admin pages are internal tools; the team reads them in English.
const OUTSIDE_BY_DESIGN = [/^App\.tsx:/, /^pages\/AdminPage\.tsx:/]
const byDesign = hits.filter((h) => OUTSIDE_BY_DESIGN.some((re) => re.test(`${h.file}:${h.line}`)))
const review = hits.filter((h) => !byDesign.includes(h))

console.log(
  `\n${review.length} string(s) outside the dictionaries needing a look${review.length ? ':' : ' — none.'}`,
)
for (const h of review) console.log(`  ${h.file}:${h.line}  "${h.text}"`)
if (byDesign.length) {
  console.log(`(${byDesign.length} more are outside by design: route SEO titles, admin tooling.)`)
}

console.log(`\n${gaps} gap(s), ${errors} error(s)`)
process.exit(errors ? 1 : 0)
