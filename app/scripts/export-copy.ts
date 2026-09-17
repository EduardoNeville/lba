// Exports every dictionary to one markdown file for editing/review:
//   docs/12-copy-all-languages.md
// Each text is shown as EN / FR / ES, keyed by the label the code uses.
// Run: npm run export:copy   (then: pandoc the .md to .docx)
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { en as homeEn, fr as homeFr, es as homeEs } from '../src/data/locales/home.ts'
import { en as aboutEn, fr as aboutFr, es as aboutEs } from '../src/data/locales/about.ts'
import { en as legalEn, fr as legalFr, es as legalEs } from '../src/data/locales/legal.ts'
import { en as propertyEn, fr as propertyFr, es as propertyEs } from '../src/data/locales/property.ts'
import { en as pcEn, fr as pcFr, es as pcEs } from '../src/data/locales/privateClient.ts'
import { nav as navEn, footer as footerEn, ui as uiEn, form as formEn, options as optionsEn, aside as asideEn } from '../src/data/locales/en.ts'
import { nav as navFr, footer as footerFr, ui as uiFr, form as formFr, options as optionsFr, aside as asideFr } from '../src/data/locales/fr.ts'
import { nav as navEs, footer as footerEs, ui as uiEs, form as formEs, options as optionsEs, aside as asideEs } from '../src/data/locales/es.ts'

type Dict = Record<string, unknown>

// Not copy — code values that happen to sit next to text in the dictionaries.
const NOT_TEXT = new Set(['to', 'url', 'href', 'value', 'icon', 'num', 'image', 'imagePos'])

const escape = (s: string) => s.replace(/([*_`])/g, '\\$1')
const cell = (v: unknown): string => {
  if (v === undefined || v === null) return '—'
  if (typeof v === 'object') return '`' + JSON.stringify(v) + '`'
  const s = String(v)
  if (s === '') return '(empty)'
  // A \n in the copy is a real line break on the site — keep it visible as one.
  return escape(s).split('\n').join('\\\n')
}

const lines: string[] = []
let count = 0
const missing: Record<'fr' | 'es', string[]> = { fr: [], es: [] }

function block(key: string, en: unknown, fr: unknown, es: unknown) {
  count++
  if (typeof en === 'string' && en !== '') {
    if (typeof fr !== 'string' || fr === '') missing.fr.push(key)
    if (typeof es !== 'string' || es === '') missing.es.push(key)
  }
  lines.push(`**\`${key}\`**`, '')
  lines.push(
    [`EN — ${cell(en)}`, `FR — ${cell(fr)}`, `ES — ${cell(es)}`].join('\\\n'),
    '',
  )
}

function label(item: unknown): string | undefined {
  if (!item || typeof item !== 'object') return undefined
  const o = item as Dict
  for (const k of ['title', 'name', 'label', 'heading']) {
    if (typeof o[k] === 'string') return o[k] as string
  }
  return undefined
}

function walk(key: string, en: unknown, fr: unknown, es: unknown, depth: number) {
  const isObj = (v: unknown) => !!v && typeof v === 'object' && !Array.isArray(v)
  const isArr = (v: unknown) => Array.isArray(v)

  // An item one language has and another lacks (fr/es carry an extra legal area)
  // must not break the alignment: fill the gap with the shape the others use.
  const seed = [en, fr, es].find((v) => v !== undefined && v !== null)
  const fill = (v: unknown) =>
    v === undefined || v === null ? (isArr(seed) ? [] : isObj(seed) ? {} : undefined) : v
  const values = [fill(en), fill(fr), fill(es)]

  if (values.every((v) => isArr(v))) {
    const max = Math.max(...values.map((v) => (v as unknown[]).length))
    for (let i = 0; i < max; i++) {
      const items = values.map((v) => (v as unknown[])[i])
      const l = label(items[0]) ?? label(items[1]) ?? label(items[2])
      if (l && items.some(isObj)) {
        lines.push(`${'#'.repeat(depth)} ${key}[${i}] — ${escape(l)}`, '')
        walk(`${key}[${i}]`, items[0], items[1], items[2], depth + 1)
      } else {
        walk(`${key}[${i}]`, items[0], items[1], items[2], depth)
      }
    }
    return
  }

  if (values.some((v) => isArr(v) || isObj(v)) && !values.every((v) => isObj(v))) {
    block(key, en, fr, es) // shape differs between languages — dump as-is
    return
  }

  if (values.every(isObj)) {
    const keys = new Set<string>()
    for (const v of values) for (const k of Object.keys(v as Dict)) if (!NOT_TEXT.has(k)) keys.add(k)
    for (const k of keys) {
      walk(key ? `${key}.${k}` : k, (en as Dict)?.[k], (fr as Dict)?.[k], (es as Dict)?.[k], depth)
    }
    return
  }

  block(key, en, fr, es)
}

function section(title: string, name: string, en: unknown, fr: unknown, es: unknown) {
  lines.push(`# ${title}`, '')
  walk(name, en, fr, es, 2)
}

lines.push(
  '# Legal Boutique Advisers — website copy',
  '',
  'Every text on the website, grouped by page and section, shown in the three languages the site supports.',
  '',
  '- **EN** is the master copy. Where **FR** or **ES** shows `—`, that text has not been translated yet and the website currently shows the English.',
  '- The code-style label above each block (`hero.heading`, `form.submit`) is the key the website uses to place the text. Please leave those untouched.',
  '- A line break inside a block is intentional: it matches a line break on the site.',
  '- Please edit only the text after the `EN —`, `FR —` and `ES —` markers.',
  '- In Word, use **View → Navigation pane** to jump between pages and sections.',
  '',
)
lines.push('# Global — navigation, footer, buttons and the enquiry form', '')
for (const [name, en, fr, es] of [
  ['nav', navEn, navFr, navEs],
  ['footer', footerEn, footerFr, footerEs],
  ['ui', uiEn, uiFr, uiEs],
  ['form', formEn, formFr, formEs],
  ['options', optionsEn, optionsFr, optionsEs],
  ['aside', asideEn, asideFr, asideEs],
] as [string, unknown, unknown, unknown][]) {
  lines.push(`## ${name}`, '')
  walk(name, en, fr, es, 3)
}
section('Home page', 'home', homeEn, homeFr, homeEs)
section('About page', 'about', aboutEn, aboutFr, aboutEs)
section('Legal page', 'legal', legalEn, legalFr, legalEs)
section('Property page', 'property', propertyEn, propertyFr, propertyEs)
section('Private client page', 'privateClient', pcEn, pcFr, pcEs)

const out = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../../docs/12-copy-all-languages.md')
lines.push(
  '# Still to translate',
  '',
  'These texts exist in English but not yet in the other languages, so the website shows the English version for now.',
  '',
)
for (const langName of ['fr', 'es'] as const) {
  lines.push(`**${langName === 'fr' ? 'French (FR)' : 'Spanish (ES)'} — ${missing[langName].length} text(s)**`, '')
  if (missing[langName].length === 0) lines.push('— none, all translated.', '')
  for (const k of missing[langName]) lines.push(`- \`${k}\``)
  lines.push('')
}
writeFileSync(out, lines.join('\n').replace(/\n{3,}/g, '\n\n'))
console.log(`wrote ${out} (${count} texts, ${missing.fr.length} fr + ${missing.es.length} es untranslated)`)
