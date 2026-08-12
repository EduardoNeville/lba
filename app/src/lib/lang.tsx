import { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'en' | 'fr' | 'es'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
}

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lba-lang')
      return saved === 'fr' || saved === 'es' ? saved : 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('lba-lang', lang)
    } catch {
      /* private mode */
    }
    document.documentElement.lang = lang
  }, [lang])

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}

export function useLang() {
  return useContext(Ctx)
}
