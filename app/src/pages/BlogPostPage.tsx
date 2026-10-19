import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { CtaBand } from '../components/shared/CtaBand'
import { getApp, firestoreDb } from '../lib/firebase'
import { localeDict } from '../lib/i18n'
import { useLang } from '../lib/lang'
import { useUi } from '../lib/nav'
import { en as journalEn, fr as journalFr, es as journalEs } from '../data/locales/journal'
import { renderMarkdown } from '../lib/markdown'
import { setPageMeta } from '../lib/seo'
import type { Post } from '../lib/posts'
import ctaCoast from '../assets/cta-coast.jpg'

function formatDate(v: unknown): string {
  try {
    const s = (v as { seconds?: number })?.seconds
    if (!s) return ''
    return new Date(s * 1000).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return ''
  }
}

export function BlogPostPage() {
  const { slug } = useParams()
  const { lang } = useLang()
  const ui = useUi()
  const t = localeDict(journalEn, lang === 'fr' ? journalFr : lang === 'es' ? journalEs : undefined)
  const [post, setPost] = useState<Post | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [html, setHtml] = useState('')

  useEffect(() => {
    if (!slug) {
      setNotFound(true)
      return
    }
    const slugVal = slug
    let cancelled = false
    async function load() {
      try {
        const { doc, getDoc, getFirestore } = await import('firebase/firestore')
        const db = firestoreDb ? getFirestore(getApp(), firestoreDb) : getFirestore(getApp())
        const snap = await getDoc(doc(db, 'posts', slugVal))
        if (!snap.exists()) {
          if (!cancelled) setNotFound(true)
          return
        }
        const data = { slug: snap.id, ...(snap.data() as Omit<Post, 'slug'>) } as Post
        if (data.status !== 'published') {
          // anon sees 404 for drafts; auth users can still view via admin preview — treat as 404 here
          // ponytail: no auth check on public page, keep simple
          if (!cancelled) setNotFound(true)
          return
        }
        if (!cancelled) {
          setPost(data)
          setHtml(renderMarkdown(data.bodyMarkdown || ''))
          setPageMeta(`${data.title} · Legal Boutique Advisers`, data.excerpt)
        }
      } catch {
        if (!cancelled) setNotFound(true)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (notFound) {
    return (
      <section className="py-20 md:py-28">
        <Container>
          <p className="micro text-taupe">{t.postNotFoundEyebrow}</p>
          <h1 className="font-display mt-4 text-3xl uppercase">{t.postNotFound}</h1>
          <Link to="/blog" className="micro mt-8 inline-block border border-ink px-6 py-3 hover:bg-ink hover:text-cream transition-colors">
            {t.back}
          </Link>
        </Container>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="py-20">
        <Container>
          <p className="text-sm text-taupe">{t.loading}</p>
        </Container>
      </section>
    )
  }

  return (
    <>
      <article>
        <section className="py-16 md:py-20">
          <Container>
            <Link to="/blog" className="micro text-taupe hover:text-oxblood">
              ← {t.eyebrow}
            </Link>
            <h1 className="font-display mt-6 text-3xl uppercase leading-[1.08] tracking-wide md:text-5xl">{post.title}</h1>
            <p className="micro mt-4 text-taupe">{formatDate(post.publishedAt ?? post.updatedAt)}</p>
            {post.excerpt && <p className="mt-6 font-display italic text-[17px] leading-relaxed text-taupe">{post.excerpt}</p>}
          </Container>
        </section>

        {post.coverImageUrl && (
          <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
            <img src={post.coverImageUrl} alt={post.title} className="max-h-[560px] w-full object-cover" />
          </div>
        )}

        <section className="py-12 md:py-16">
          <Container>
            <div>
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
            <div className="mt-12 border-t border-hairline pt-8">
              <Link to="/blog" className="micro text-ink hover:text-oxblood">
                ← {t.back}
              </Link>
            </div>
          </Container>
        </section>
      </article>

      <CtaBand image={ctaCoast} cta={{ to: '/inquiry', label: ui.privateEnquiry }} />
    </>
  )
}
