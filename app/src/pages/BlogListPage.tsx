import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { CtaBand } from '../components/shared/CtaBand'
import { getApp } from '../lib/firebase'
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

export function BlogListPage() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const { collection, getDocs, getFirestore, query, where } = await import('firebase/firestore')
        const db = getFirestore(getApp(), firestoreDb)
        const snap = await getDocs(query(collection(db, 'posts'), where('status', '==', 'published')))
        const arr = snap.docs.map((d) => ({ slug: d.id, ...(d.data() as Omit<Post, 'slug'>) })) as Post[]
        arr.sort((a, b) => {
          const at = (a.publishedAt as { seconds?: number })?.seconds ?? (a.updatedAt as { seconds?: number })?.seconds ?? 0
          const bt = (b.publishedAt as { seconds?: number })?.seconds ?? (b.updatedAt as { seconds?: number })?.seconds ?? 0
          return bt - at
        })
        if (!cancelled) setPosts(arr)
      } catch {
        if (!cancelled) setError('We could not load the journal right now.')
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <section className="py-16 md:py-20">
        <Container>
          <p className="micro flex items-center gap-3 text-ink">
            <span aria-hidden className="h-px w-8 bg-ink/60" />
            Journal
          </p>
          <h1 className="font-display mt-4 max-w-[20ch] text-4xl uppercase leading-[1.08] tracking-wide md:text-5xl">
            Insights &amp; updates
          </h1>
          <p className="mt-6 max-w-prose text-sm leading-relaxed text-taupe md:text-[15px]">
            Notes on property, law and life in Spain, from our team in Marbella.
          </p>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          {error && <p className="micro text-oxblood">{error}</p>}
          {posts === null && !error && <p className="text-sm text-taupe">Loading…</p>}
          {posts !== null && posts.length === 0 && !error && (
            <p className="text-sm leading-relaxed text-taupe">No posts yet. Check back soon.</p>
          )}
          {posts && posts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group flex flex-col border border-hairline bg-parchment/40 overflow-hidden hover:border-taupe transition-colors"
                >
                  {p.coverImageUrl ? (
                    <img src={p.coverImageUrl} alt={p.title} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="aspect-[16/10] w-full bg-parchment" aria-hidden />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="micro text-[10px] tracking-[0.18em] text-taupe">{formatDate(p.publishedAt ?? p.updatedAt)}</p>
                    <h2 className="font-display mt-2 text-lg uppercase leading-snug tracking-wide group-hover:text-oxblood">{p.title}</h2>
                    {p.excerpt && <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-taupe">{p.excerpt}</p>}
                    <span className="micro mt-4 inline-flex text-[10px] text-ink group-hover:text-oxblood">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CtaBand heading="Every client is different." subline="Tell us what brings you to Spain." image={ctaCoast} cta={{ to: '/inquiry', label: 'Make a private enquiry' }} />
    </>
  )
}
