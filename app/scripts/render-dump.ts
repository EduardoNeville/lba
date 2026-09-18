// Dumps the visible text of every page in EN/FR/ES (SSR through the real
// components) so two revisions can be diffed:
//   node --experimental-strip-types scripts/render-dump.ts /tmp/dump-pre
import { createServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { writeFileSync } from 'node:fs'

const prefix = process.argv[2] ?? '/tmp/dump'
const store: Record<string, string> = {}
;(globalThis as any).localStorage = {
  getItem: (k: string) => (k in store ? store[k] : null),
  setItem: (k: string, v: string) => { store[k] = String(v) },
  removeItem: (k: string) => { delete store[k] },
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
  cacheDir: process.env.VITE_CACHE ?? '/tmp/vite-cache-dump',
})
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

for (const lang of ['en', 'fr', 'es']) {
  store['lba-lang'] = lang
  const out: string[] = []
  for (const [route, file] of routes) {
    const mod: any = await load(file)
    const Comp = mod[Object.keys(mod).find((k) => k.endsWith('Page')) as string]
    const html = renderToStaticMarkup(
      React.createElement(LangProvider, null,
        React.createElement(MemoryRouter, { initialEntries: [route] },
          React.createElement(SiteHeader),
          React.createElement(Comp),
          React.createElement(SiteFooter))),
    )
    const text = html
      .replace(/<!--.*?-->/g, '')
      .replace(/<[^>]+>/g, '\n')          // visible text only — no attributes
      .replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"')
      .split('\n').map((s) => s.trim()).filter(Boolean).join('\n')
    out.push(`===== ${route} =====\n${text}`)
  }
  const file = `${prefix}-${lang}.txt`
  writeFileSync(file, out.join('\n\n'))
  console.log('wrote', file)
}
await server.close()
