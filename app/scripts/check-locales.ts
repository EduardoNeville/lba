// Locale check — `en` is the source of truth for every dictionary.
// Fails if fr/es define a key en does not (typo/orphan) or with a different type;
// lists en keys that still have no translation (a gap, not a failure).
// Run: npm run check:locales
import { en as homeEn, fr as homeFr, es as homeEs } from '../src/data/locales/home.ts'
import { en as aboutEn, fr as aboutFr, es as aboutEs } from '../src/data/locales/about.ts'
import { en as legalEn, fr as legalFr, es as legalEs } from '../src/data/locales/legal.ts'
import { en as propertyEn, fr as propertyFr, es as propertyEs } from '../src/data/locales/property.ts'
import { en as pcEn, fr as pcFr, es as pcEs } from '../src/data/locales/privateClient.ts'
import { nav as gNavEn, footer as gFooterEn, ui as gUiEn, form as gFormEn, options as gOptionsEn, aside as gAsideEn } from '../src/data/locales/en.ts'
import { nav as gNavFr, footer as gFooterFr, ui as gUiFr, form as gFormFr, options as gOptionsFr, aside as gAsideFr } from '../src/data/locales/fr.ts'
import { nav as gNavEs, footer as gFooterEs, ui as gUiEs, form as gFormEs, options as gOptionsEs, aside as gAsideEs } from '../src/data/locales/es.ts'

const dicts: [string, Record<string, unknown>, Record<string, unknown>, Record<string, unknown>][] = [
  ['home', homeEn, homeFr, homeEs],
  ['about', aboutEn, aboutFr, aboutEs],
  ['legal', legalEn, legalFr, legalEs],
  ['property', propertyEn, propertyFr, propertyEs],
  ['privateClient', pcEn, pcFr, pcEs],
  ['globals/nav', gNavEn, gNavFr, gNavEs],
  ['globals/footer', gFooterEn, gFooterFr, gFooterEs],
  ['globals/ui', gUiEn, gUiFr, gUiEs],
  ['globals/form', gFormEn, gFormFr, gFormEs],
  ['globals/options', gOptionsEn as unknown as Record<string, unknown>, gOptionsFr as unknown as Record<string, unknown>, gOptionsEs as unknown as Record<string, unknown>],
  ['globals/aside', gAsideEn, gAsideFr, gAsideEs],
]

type Kind = 'string' | 'array' | 'object' | 'other'
const kind = (v: unknown): Kind =>
  typeof v === 'string' ? 'string' : Array.isArray(v) ? 'array' : v && typeof v === 'object' ? 'object' : 'other'

// Leaf keys of an object tree (arrays compared as a single leaf).
function leaves(obj: unknown, prefix = ''): Map<string, Kind> {
  const out = new Map<string, Kind>()
  if (kind(obj) !== 'object') {
    if (prefix) out.set(prefix, kind(obj))
    return out
  }
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${k}` : k
    for (const [p, t] of leaves(v, path)) out.set(p, t)
  }
  return out
}

let errors = 0
let untranslated = 0

for (const [name, en, fr, es] of dicts) {
  for (const [langName, other] of [['fr', fr], ['es', es]] as const) {
    const enLeaves = leaves(en)
    const otherLeaves = leaves(other)
    for (const [path, t] of otherLeaves) {
      const enType = enLeaves.get(path)
      if (enType === undefined) {
        console.error(`✗ ${name}: ${langName}.${path} is not in en (orphan key)`)
        errors++
      } else if (enType !== t) {
        console.error(`✗ ${name}: ${langName}.${path} is ${t}, en has ${enType}`)
        errors++
      }
    }
    for (const path of enLeaves.keys()) {
      if (!otherLeaves.has(path)) {
        console.warn(`· ${name}: ${langName}.${path} untranslated — falls back to en`)
        untranslated++
      }
    }
  }
}

console.log(`\n${untranslated} untranslated key(s), ${errors} error(s)`)
if (errors) process.exit(1)
