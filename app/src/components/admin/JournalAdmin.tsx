import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDb } from '../../lib/firestore'
import { uploadImage } from '../../lib/media'
import { slugify } from '../../lib/posts'
import { renderMarkdown } from '../../lib/markdown'
import { btnCls, controlCls, ghostBtnCls, hintCls, labelCls, panelCls, primaryBtnCls, rowCls } from './styles'

type Status = 'draft' | 'published'

interface PostRow {
  slug: string
  title: string
  excerpt: string
  bodyMarkdown: string
  coverImageUrl?: string
  coverImagePath?: string
  status: Status
  createdAt?: { seconds: number }
  updatedAt?: { seconds: number }
  publishedAt?: { seconds: number }
}

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  coverUrl: '',
  coverPath: '',
  status: 'draft' as Status,
}

// The journal panel of /admin. Auth and the tab shell live in pages/AdminPage.
export function JournalAdmin() {
  const [posts, setPosts] = useState<PostRow[] | null>(null)
  const [editing, setEditing] = useState<PostRow | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [preview, setPreview] = useState(false)
  const [uploading, setUploading] = useState(false)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  async function loadPosts() {
    const { collection, getDocs } = await import('firebase/firestore')
    const db = await getDb()
    const snap = await getDocs(collection(db, 'posts'))
    const arr = snap.docs.map((d) => ({ slug: d.id, ...(d.data() as Omit<PostRow, 'slug'>) })) as PostRow[]
    arr.sort((a, b) => (b.updatedAt?.seconds ?? 0) - (a.updatedAt?.seconds ?? 0))
    setPosts(arr)
  }

  useEffect(() => {
    loadPosts()
  }, [])

  function startNew() {
    setIsNew(true)
    setEditing(null)
    setForm(emptyForm)
    setSaveError('')
    setPreview(false)
  }

  function startEdit(p: PostRow) {
    setIsNew(false)
    setEditing(p)
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || '',
      body: p.bodyMarkdown || '',
      coverUrl: p.coverImageUrl || '',
      coverPath: p.coverImagePath || '',
      status: p.status,
    })
    setSaveError('')
    setPreview(false)
  }

  // Paths are built in lib/media.ts so every upload lands under a prefix the
  // storage rules allow (blog/…, properties/…, dev/… in development).
  async function uploadTo(file: File, scope: string) {
    setUploading(true)
    try {
      return await uploadImage(file, 'blog', scope)
    } finally {
      setUploading(false)
    }
  }

  async function onCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return setSaveError('Please choose an image file.')
    if (file.size > 5 * 1024 * 1024) return setSaveError('Image must be under 5MB.')
    try {
      const { url, path } = await uploadTo(file, 'cover')
      // path is kept so a future delete can remove the Storage object
      setForm((f) => ({ ...f, coverUrl: url, coverPath: path }))
      setSaveError('')
    } catch {
      setSaveError('Upload failed. Try again.')
    }
    e.target.value = ''
  }

  async function onInlineUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return setSaveError('Please choose an image file.')
    if (file.size > 5 * 1024 * 1024) return setSaveError('Image must be under 5MB.')
    try {
      const { url } = await uploadTo(file, form.slug || slugify(form.title) || 'inline')
      const insert = `![image](${url})`
      const ta = bodyRef.current
      if (ta) {
        const start = ta.selectionStart
        const end = ta.selectionEnd
        const before = form.body.slice(0, start)
        const after = form.body.slice(end)
        const next = before + (before && !before.endsWith('\n') ? '\n' : '') + insert + '\n' + after
        setForm((f) => ({ ...f, body: next }))
        setTimeout(() => {
          ta.focus()
          ta.selectionStart = ta.selectionEnd = start + insert.length + 1
        }, 0)
      } else {
        setForm((f) => ({ ...f, body: f.body + '\n' + insert + '\n' }))
      }
      setSaveError('')
    } catch {
      setSaveError('Image upload failed.')
    }
    e.target.value = ''
  }

  async function handleSave() {
    setSaveError('')
    const title = form.title.trim()
    const slug = slugify(form.slug || title)
    if (!title) {
      setSaveError('Title is required.')
      return
    }
    if (!slug) {
      setSaveError('Slug is required.')
      return
    }
    setSaving(true)
    try {
      const { doc, serverTimestamp, setDoc } = await import('firebase/firestore')
      const db = await getDb()
      const payload: Record<string, unknown> = {
        title,
        excerpt: form.excerpt.trim(),
        bodyMarkdown: form.body,
        coverImageUrl: form.coverUrl || null,
        coverImagePath: form.coverPath || null,
        status: form.status,
        updatedAt: serverTimestamp(),
      }
      // publishedAt is set once, on the first publish: re-saving a published post
      // must not push it back to the top of the journal.
      if (form.status === 'published' && !editing?.publishedAt) payload.publishedAt = serverTimestamp()
      if (isNew) payload.createdAt = serverTimestamp()

      // ponytail: slug is doc ID. Renames not supported v1 — create new doc if slug changed on edit.
      const targetSlug = isNew ? slug : editing!.slug
      if (!isNew && slug !== editing!.slug) {
        const { deleteDoc } = await import('firebase/firestore')
        await setDoc(doc(db, 'posts', slug), { ...payload, slug }, { merge: false })
        await deleteDoc(doc(db, 'posts', editing!.slug))
      } else {
        await setDoc(doc(db, 'posts', targetSlug), { ...payload, slug: targetSlug }, { merge: true })
      }
      await loadPosts()
      setEditing(null)
      setIsNew(false)
      setForm(emptyForm)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return
    const { doc, deleteDoc } = await import('firebase/firestore')
    const db = await getDb()
    await deleteDoc(doc(db, 'posts', slug))
    await loadPosts()
    if (editing?.slug === slug) {
      setEditing(null)
      setIsNew(false)
    }
  }

  const isEditing = editing !== null || isNew

  if (!isEditing) {
    return (
      <>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="micro text-taupe">{posts === null ? 'Loading…' : `${posts.length} posts`}</p>
          <div className="flex items-center gap-3">
            <Link to="/blog" className={btnCls}>
              View blog →
            </Link>
            <button onClick={startNew} className={primaryBtnCls}>
              + New post
            </button>
          </div>
        </div>

        <div className="mt-6 divide-y divide-hairline border-y border-hairline">
          {posts === null && <p className="py-8 text-sm text-taupe">Loading…</p>}
          {posts !== null && posts.length === 0 && <p className="py-8 text-sm text-taupe">No posts yet. Create your first one.</p>}
          {posts?.map((p) => (
            <div key={p.slug} className={rowCls}>
              <div className="min-w-0">
                <p className="font-display uppercase leading-snug">{p.title || '(untitled)'}</p>
                <p className="micro mt-1 flex gap-3 text-taupe">
                  <span>/{p.slug}</span>
                  <span className={p.status === 'published' ? 'text-oxblood' : ''}>● {p.status}</span>
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => startEdit(p)} className={btnCls}>
                  Edit
                </button>
                <button onClick={() => handleDelete(p.slug)} className={`${btnCls} text-oxblood`}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded border border-hairline bg-parchment/60 p-4 text-[12px] leading-relaxed text-taupe">
          <p className="font-display text-ink">How to add an image:</p>
          <p className="mt-1">
            Cover image → “Upload cover”. Inline → “Add image to body” (auto-inserts at your cursor). Images
            save to Firebase Storage under <code className="bg-parchment px-1">blog/…</code> and go live
            instantly. No redeploy needed.
          </p>
          <p className="mt-2 text-ink">
            Markdown: <code>**bold**</code>, <code>*italic*</code>, <code>[link](https://…)</code>,{' '}
            <code># H1</code>, <code>## H2</code>, <code>- list</code>, <code>---</code> rule,{' '}
            <code>![alt](url)</code> (auto via upload). Preview with the “Preview” toggle.
          </p>
        </div>
      </>
    )
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-5">
        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditing(null)
              setIsNew(false)
            }}
            className={ghostBtnCls}
          >
            ← Back to list
          </button>
          <button
            onClick={() => setPreview((v) => !v)}
            className={`micro border px-4 py-2 ${preview ? 'border-ink bg-ink text-cream' : 'border-hairline hover:bg-parchment'}`}
          >
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>

        {!preview ? (
          <>
            <div>
              <label className={labelCls}>Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: isNew ? slugify(e.target.value) : f.slug }))}
                placeholder="My first post"
                className={controlCls}
              />
            </div>
            <div>
              <label className={labelCls}>Slug (URL)</label>
              <div className="flex gap-2">
                <span className="hidden items-center bg-parchment px-3 text-[11px] text-taupe md:inline-flex">/blog/</span>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                  placeholder="my-first-post"
                  className={`${controlCls} font-mono text-xs`}
                  disabled={!isNew}
                />
              </div>
              {!isNew && <p className={hintCls}>Slug is locked after creation. Change it to create a new URL (old URL will break).</p>}
            </div>
            <div>
              <label className={labelCls}>Excerpt (shows on list + SEO)</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                rows={2}
                placeholder="One sentence that invites the reader…"
                className={controlCls}
                maxLength={260}
              />
              <p className={`${hintCls} text-right`}>{form.excerpt.length}/260</p>
            </div>

            <div>
              <label className={labelCls}>Cover image</label>
              {form.coverUrl && <img src={form.coverUrl} alt="" className="mb-3 max-h-64 w-full border border-hairline object-cover" />}
              <div className="flex flex-wrap gap-2">
                <label className="micro inline-flex cursor-pointer items-center border border-hairline bg-white px-4 py-2 hover:bg-parchment">
                  {uploading ? 'Uploading…' : form.coverUrl ? 'Replace cover' : 'Upload cover'}
                  <input type="file" accept="image/*" onChange={onCoverUpload} className="hidden" disabled={uploading} />
                </label>
                {form.coverUrl && (
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, coverUrl: '', coverPath: '' }))}
                    className={ghostBtnCls}
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className={hintCls}>JPG or PNG, under 5MB. ~1600px wide recommended.</p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="micro block text-ink">Body (Markdown + images)</label>
                <label className="micro inline-flex cursor-pointer items-center border border-hairline bg-white px-3 py-1.5 text-[10px] hover:bg-parchment">
                  {uploading ? 'Uploading…' : '+ Add image to body'}
                  <input type="file" accept="image/*" onChange={onInlineUpload} className="hidden" disabled={uploading} />
                </label>
              </div>
              <textarea
                ref={bodyRef}
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                rows={18}
                placeholder={`Write here…\n\n# Heading\n\nSome **bold** and *italic* text.\n\n![image](imageurl)  ← upload adds it at your cursor\n\n- list item\n- another`}
                className={`${controlCls} font-mono text-xs leading-relaxed`}
              />
              <p className={hintCls}>
                Click “Add image to body” to upload and insert at your cursor. <span className="text-ink">**bold**</span>,{' '}
                <code className="bg-parchment px-1">*italic*</code>, <code className="bg-parchment px-1"># H1</code>,{' '}
                <code className="bg-parchment px-1">- list</code>
              </p>
            </div>

            <div className="flex items-center gap-3 border border-hairline bg-parchment/50 p-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.status === 'published'}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.checked ? 'published' : 'draft' }))}
                  className="h-4 w-4 accent-oxblood"
                />
                <span className="micro text-ink">Published</span>
              </label>
              <span className={hintCls}>{form.status === 'published' ? 'Visible at /blog' : 'Draft · only you can see it'}</span>
            </div>

            {saveError && <p className="micro text-oxblood">{saveError}</p>}

            <div className="flex gap-3">
              <button onClick={handleSave} disabled={saving || uploading} className={`${primaryBtnCls} flex-1`}>
                {saving ? 'Saving…' : form.status === 'published' ? 'Save & publish' : 'Save draft'}
              </button>
              <button
                onClick={() => {
                  setEditing(null)
                  setIsNew(false)
                }}
                className="micro border border-hairline px-6 py-3 hover:bg-parchment"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className={panelCls}>
            <p className="micro text-taupe">Preview</p>
            <h2 className="font-display mt-2 text-2xl uppercase">{form.title || '(no title)'}</h2>
            {form.excerpt && <p className="font-display mt-3 italic text-taupe">{form.excerpt}</p>}
            {form.coverUrl && <img src={form.coverUrl} alt="" className="mt-6 w-full object-cover" />}
            <div className="rich-text mt-6" dangerouslySetInnerHTML={{ __html: renderMarkdown(form.body || '*Nothing yet*') }} />
          </div>
        )}
      </div>

      {/* live preview sidebar on desktop when not in preview mode */}
      {!preview && (
        <div className="hidden lg:block">
          <div className={`${panelCls} sticky top-24`}>
            <p className="micro text-taupe">Live preview</p>
            <h3 className="font-display mt-2 uppercase leading-snug">{form.title || '(no title)'}</h3>
            {form.excerpt && <p className="mt-2 text-[13px] italic text-taupe">{form.excerpt}</p>}
            <div
              className="rich-text mt-4 max-h-[60vh] overflow-auto pr-2 text-sm"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(form.body || '*Start writing…*') }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
