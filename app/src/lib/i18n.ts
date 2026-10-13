type Dict = Record<string, unknown>

const isPlainObject = (v: unknown): v is Dict =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

// Page copy is merged with a shallow spread (`{ ...en, ...fr }`), which silently
// drops a whole nested block when a translation is partial — every key inside it
// becomes undefined instead of falling back to English. localeDict() merges one
// level deep so a half-translated section still renders, and leaves arrays
// (lists of cards, bullets) replaced wholesale, which is what the callers expect.
export function localeDict<T extends Dict>(en: T, override?: Partial<T> | Dict): T {
  if (!override) return en
  const out: Dict = { ...en }
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue
    const base = en[key]
    out[key] = isPlainObject(base) && isPlainObject(value) ? { ...base, ...value } : value
  }
  return out as T
}
