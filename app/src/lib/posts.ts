export type PostStatus = 'draft' | 'published'

export interface Post {
  slug: string
  title: string
  excerpt: string
  bodyMarkdown: string
  coverImageUrl?: string
  coverImagePath?: string
  status: PostStatus
  publishedAt?: unknown
  updatedAt?: unknown
  createdAt?: unknown
  author?: string
}

export function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'untitled'
  )
}

export function excerptFromBody(body: string, fallback = ''): string {
  const plain = body.replace(/[#*_[\]()!]/g, ' ').replace(/\s+/g, ' ').trim()
  if (plain) return plain.slice(0, 160)
  return fallback
}
