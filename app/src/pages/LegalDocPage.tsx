import { useEffect } from 'react'
import { Container } from '../components/ui/Container'
import { Eyebrow } from '../components/ui/Eyebrow'
import { setPageMeta } from '../lib/seo'
import type { LegalDoc } from '../data/legalDocs'

export function LegalDocPage({ doc }: { doc: LegalDoc }) {
  useEffect(() => {
    setPageMeta(`${doc.title} · Legal Boutique Advisers`)
  }, [doc])

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-[68ch]">
          <Eyebrow>Legal Boutique Advisers</Eyebrow>
          <h1 className="font-display mt-4 text-3xl uppercase leading-[1.08] tracking-wide md:text-4xl">
            {doc.title}
          </h1>
          <p className="micro mt-4 text-taupe">{doc.updated}</p>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-taupe">
            {doc.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-12 space-y-10">
            {doc.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-lg uppercase tracking-[0.12em] text-ink">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-taupe">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}