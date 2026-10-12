import { en, es, fr } from '../data/locales/residences'
import { localeDict } from './i18n'
import { useLang } from './lang'

export type ResidencesCopy = typeof en

// One accessor for the residences section, so the listing page, the cards, the
// filters and (later) the detail page and carousel never drift apart.
export function useResidencesCopy(): ResidencesCopy {
  const { lang } = useLang()
  if (lang === 'fr') return localeDict(en, fr)
  if (lang === 'es') return localeDict(en, es)
  return en
}

// Canonical values are what Firestore stores (PROPERTY_TYPES, PROPERTY_AREAS,
// PROPERTY_FEATURES); the label comes from the dictionary and falls back to the
// stored value, so an untranslated area is shown rather than dropped.
export function labelFor(map: Record<string, string>, value: string): string {
  return map[value] ?? value
}
