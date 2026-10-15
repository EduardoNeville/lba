// Every dictionary the site translates — discovered from the folder, not listed by hand.
//
// The coverage check and the copy export both read this, so a new
// `src/data/locales/<page>.ts` is checked and exported the moment it exists: the two
// cannot drift apart, and neither can quietly forget a page. `en` is the master; fr/es
// are partial by design (each missing key falls back to English) and everything that
// reads this reports what is missing.
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DIR = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../src/data/locales')

export interface Dictionary {
  /** Folder name for a page (`home`, `residences`), or `ui`/`nav`/… for the globals. */
  name: string
  kind: 'global' | 'page'
  en: Record<string, unknown>
  fr: Record<string, unknown>
  es: Record<string, unknown>
}

/** The globals live as separate exports inside en.ts / fr.ts / es.ts. */
const LANG_FILES = new Set(['en', 'fr', 'es'])

/** Where the copy deck puts each page, in the order the client reads it. Anything not
 *  listed is appended at the end (`deckSections`), so the export stays complete. */
export const DECK_ORDER: { name: string; title: string }[] = [
  { name: 'home', title: 'Home page' },
  { name: 'about', title: 'About page' },
  { name: 'legal', title: 'Legal page' },
  { name: 'property', title: 'Property page' },
  { name: 'privateClient', title: 'Private client page' },
  { name: 'residences', title: 'Residences' },
  { name: 'journal', title: 'Journal' },
  { name: 'notFound', title: 'Page not found' },
]

const isDict = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v)

export async function loadDictionaries(): Promise<Dictionary[]> {
  const files = readdirSync(DIR)
    .filter((f) => f.endsWith('.ts'))
    .sort()
  const langs: Record<string, Record<string, unknown>> = {}
  const pages: Dictionary[] = []

  for (const file of files) {
    const name = file.replace(/\.ts$/, '')
    const mod = (await import(path.join(DIR, file))) as Record<string, unknown>
    if (LANG_FILES.has(name)) {
      langs[name] = mod
      continue
    }
    if (!isDict(mod.en)) {
      throw new Error(
        `src/data/locales/${file} exports no \`en\` dictionary. Every file there is either a language file (en.ts, fr.ts, es.ts) or a dictionary exporting en + fr + es.`,
      )
    }
    pages.push({
      name,
      kind: 'page',
      en: mod.en,
      fr: isDict(mod.fr) ? mod.fr : {},
      es: isDict(mod.es) ? mod.es : {},
    })
  }

  // Each global export is its own dictionary, so the deck keeps its nav / footer / ui /
  // form sections instead of one undifferentiated blob.
  const globals: Dictionary[] = Object.keys(langs.en ?? {})
    .filter((key) => isDict(langs.en[key]))
    .map((key) => ({
      name: key,
      kind: 'global' as const,
      en: langs.en[key] as Record<string, unknown>,
      fr: isDict(langs.fr?.[key]) ? (langs.fr[key] as Record<string, unknown>) : {},
      es: isDict(langs.es?.[key]) ? (langs.es[key] as Record<string, unknown>) : {},
    }))

  return [...globals, ...sortPages(pages)]
}

function sortPages(pages: Dictionary[]): Dictionary[] {
  const order = new Map(DECK_ORDER.map((s, i) => [s.name, i]))
  return [...pages].sort(
    (a, b) => (order.get(a.name) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.name) ?? Number.MAX_SAFE_INTEGER),
  )
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
/** The deck's sections: DECK_ORDER, plus anything the folder has that it does not. */
export function deckSections(pages: Dictionary[]): { name: string; title: string }[] {
  const known = new Map(DECK_ORDER.map((s) => [s.name, s.title]))
  return pages.map((p) => ({ name: p.name, title: known.get(p.name) ?? p.name }))
}
