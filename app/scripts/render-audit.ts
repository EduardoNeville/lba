// Renders the real header/footer/pages for EN/FR/ES (SSR) and reports every
// dictionary text that never reaches a page — copy that is editable in the
// shared document but invisible on the site. Run: node --experimental-strip-types scripts/render-audit.ts
import { createServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

const store: Record<string, string> = {}
;(globalThis as any).localStorage = {
  getItem: (k: string) => (k in store ? store[k] : null),
  setItem: (k: string, v: string) => { store[k] = String(v) },
  removeItem: (k: string) => { delete store[k] },
}

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const load = (p: string) => server.ssrLoadModule(p)

const { LangProvider } = await load('/src/lib/lang.tsx')
const { SiteHeader } = await load('/src/components/layout/SiteHeader.tsx')
const { SiteFooter } = await load('/src/components/layout/SiteFooter.tsx')

const routes: [string, string][] = [
  ['/', '/src/pages/HomePage.tsx'],
  ['/about', '/src/pages/AboutPage.tsx'],
  ['/legal', '/src/pages/LegalPage.tsx'],
  ['/property', '/src/pages/PropertyPage.tsx'],
  ['/private-client', '/src/pages/PrivateClientPage.tsx'],
  ['/inquiry', '/src/pages/InquiryPage.tsx'],
]

function textOf(html: string): string {
  const attrs = [...html.matchAll(/(?:alt|placeholder|aria-label|title)="([^"]*)"/g)].map((m) => m[1])
  return html.replace(/<[^>]+>/g, ' ') + ' ' + attrs.join(' ')
}

const rendered: Record<string, string> = {}
for (const lang of ['en', 'fr', 'es']) {
  store['lba-lang'] = lang
  const parts: string[] = []
  for (const [route, file] of routes) {
    const mod = await load(file)
    const Comp = mod[Object.keys(mod).find((k) => k.endsWith('Page')) as string]
    const html = renderToStaticMarkup(
      React.createElement(LangProvider, null,
        React.createElement(MemoryRouter, { initialEntries: [route] },
          React.createElement(SiteHeader),
          React.createElement(Comp),
          React.createElement(SiteFooter))),
    )
    parts.push(textOf(html))
  }
  rendered[lang] = parts.join(' ')
    .replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;|&#160;/g, ' ')
    .replace(/\s+/g, ' ')
}

const dictFiles: Record<string, string> = {
  home: '/src/data/locales/home.ts',
  about: '/src/data/locales/about.ts',
  legal: '/src/data/locales/legal.ts',
  property: '/src/data/locales/property.ts',
  privateClient: '/src/data/locales/privateClient.ts',
}
const SKIP = new Set(['icon', 'to', 'num', 'image', 'imagePos', 'value', 'url', 'link', 'linkHref'])

function leaves(obj: any, prefix = '', out: [string, string][] = []): [string, string][] {
  for (const [k, v] of Object.entries(obj)) {
    if (SKIP.has(k)) continue
    const path = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'string') out.push([path, v])
    else if (Array.isArray(v)) v.forEach((x, i) => (typeof x === 'string' ? out.push([`${path}[${i}]`, x]) : x && typeof x === 'object' && leaves(x, `${path}[${i}]`, out)))
    else if (v && typeof v === 'object') leaves(v, path, out)
  }
  return out
}

const dead: [string, string, string][] = []
let checked = 0
const flat = (s: string) => s.replace(/\s+/g, '')
const flatRendered: Record<string, string> = {
  en: flat(rendered.en),
  fr: flat(rendered.fr),
  es: flat(rendered.es),
}
for (const [name, file] of Object.entries(dictFiles)) {
  const mod: any = await load(file)
  for (const lang of ['en', 'fr', 'es'] as const) {
    const dict = { ...mod.en, ...(lang === 'fr' ? mod.fr : lang === 'es' ? mod.es : {}) }
    for (const [path, value] of leaves(dict, name)) {
      if (value.length < 3) continue
      checked++
      if (!flatRendered[lang].includes(flat(value))) dead.push([lang, path, value])
    }
  }
}
for (const lang of ['en', 'fr', 'es'] as const) {
  const all = await load(`/src/data/locales/${lang}.ts`)
  for (const area of ['nav', 'footer', 'ui', 'form', 'options', 'aside']) {
    for (const [path, value] of leaves({ [area]: (all as any)[area] }, 'globals')) {
      if (value.length < 3) continue
      checked++
      if (!flatRendered[lang].includes(flat(value))) dead.push([lang, path, value])
    }
  }
}

console.log(`checked ${checked} texts across EN/FR/ES\n`)
for (const [lang, path, value] of dead) {
  console.log(`[${lang}] ${path} = ${JSON.stringify(value.slice(0, 96))}`)
}
console.log(`\nnot rendered anywhere: ${dead.length}`)
await server.close()
