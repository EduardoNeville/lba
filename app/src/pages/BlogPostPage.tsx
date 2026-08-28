import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { CtaBand } from '../components/shared/CtaBand'
import { getApp } from '../lib/firebase'
import { renderMarkdown } from '../lib/markdown'
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
        const db = getFirestore(getApp())
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
          document.title = `${data.title} — Legal Boutique Advisers`
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
          <p className="micro text-taupe">Not found</p>
          <h1 className="font-display mt-4 text-3xl uppercase">This post does not exist.</h1>
          <Link to="/blog" className="micro mt-8 inline-block border border-ink px-6 py-3 hover:bg-ink hover:text-cream transition-colors">
            Back to journal
          </Link>
        </Container>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="py-20">
        <Container>
          <p className="text-sm text-taupe">Loading…</p>
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
              ← Journal
            </Link>
            <h1 className="font-display mt-6 max-w-[22ch] text-3xl uppercase leading-[1.08] tracking-wide md:text-5xl">{post.title}</h1>
            <p className="micro mt-4 text-taupe">{formatDate(post.publishedAt ?? post.updatedAt)}</p>
            {post.excerpt && <p className="mt-6 max-w-prose font-display italic text-[17px] leading-relaxed text-taupe">{post.excerpt}</p>}
          </Container>
        </section>

        {post.coverImageUrl && (
          <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
            <img src={post.coverImageUrl} alt="" className="max-h-[560px] w-full object-cover" />
          </div>
        )}

        <section className="py-12 md:py-16">
          <Container>
            <div className="max-w-[68ch]">
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
            <div className="mt-12 border-t border-hairline pt-8">
              <Link to="/blog" className="micro text-ink hover:text-oxblood">
                ← Back to journal
              </Link>
            </div>
          </Container>
        </section>
      </article>

      <CtaBand heading="Questions about Spain?" subline="We’re here to help." image={ctaCoast} cta={{ to: '/inquiry', label: 'Make a private enquiry' }} />
    </>
  )
}
