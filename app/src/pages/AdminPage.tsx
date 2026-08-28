import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { getApp } from '../lib/firebase'
import { slugify } from '../lib/posts'
import { renderMarkdown } from '../lib/markdown'

type Status = 'draft' | 'published'
interface PostRow {
  slug: string
  title: string
  excerpt: string
  bodyMarkdown: string
  coverImageUrl?: string
  coverImagePath?: string
  status: Status
  updatedAt?: { seconds: number }
}

const controlCls =
  'w-full border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-taupe/60 focus:border-oxblood focus:outline-none transition-colors'

export function AdminPage() {
  const [user, setUser] = useState<unknown | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [posts, setPosts] = useState<PostRow[] | null>(null)
  const [editing, setEditing] = useState<PostRow | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', body: '', coverUrl: '', coverPath: '', status: 'draft' as Status })
  const [preview, setPreview] = useState(false)
  const [uploading, setUploading] = useState(false)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  // auth state
  useEffect(() => {
    let unsub: (() => void) | null = null
    ;(async () => {
      const { getAuth, onAuthStateChanged } = await import('firebase/auth')
      const auth = getAuth(getApp())
      unsub = onAuthStateChanged(auth, (u) => {
        setUser(u)
        setAuthLoading(false)
      })
    })()
    return () => {
      if (unsub) unsub()
    }
  }, [])

  async function loadPosts() {
    const { collection, getDocs, getFirestore } = await import('firebase/firestore')
    const db = getFirestore(getApp())
    const snap = await getDocs(collection(db, 'posts'))
    const arr = snap.docs.map((d) => ({ slug: d.id, ...(d.data() as Omit<PostRow, 'slug'>) })) as PostRow[]
    arr.sort((a, b) => (b.updatedAt?.seconds ?? 0) - (a.updatedAt?.seconds ?? 0))
    setPosts(arr)
  }

  useEffect(() => {
    if (user) loadPosts()
  }, [user])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError('')
    try {
      const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth')
      await signInWithEmailAndPassword(getAuth(getApp()), email.trim(), password)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed'
      setAuthError(msg.includes('auth/') ? 'Invalid email or password.' : msg)
    }
  }

  async function handleLogout() {
    const { getAuth, signOut } = await import('firebase/auth')
    await signOut(getAuth(getApp()))
    setPosts(null)
  }

  function startNew() {
    setIsNew(true)
    setEditing(null)
    setForm({ title: '', slug: '', excerpt: '', body: '', coverUrl: '', coverPath: '', status: 'draft' })
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

  function onTitleChange(v: string) {
    setForm((f) => ({ ...f, title: v, slug: isNew ? slugify(v) : f.slug }))
  }

  // ponytail: resize+compress on the client so stored & egress bytes shrink ~5-10x,
  // which is the real spend cap (Stored $0.026/GB, download $0.12/GB).
  async function compressImage(file: File): Promise<{ blob: Blob; type: string }> {
    const MAX = 1600 // long edge
    if (file.type === 'image/svg+xml') return { blob: file, type: file.type }
    const bmp = await createImageBitmap(file).catch(() => null)
    if (!bmp) return { blob: file, type: file.type } // decode failed, send original
    try {
      const scale = Math.min(1, MAX / Math.max(bmp.width, bmp.height))
      const w = Math.max(1, Math.round(bmp.width * scale))
      const h = Math.max(1, Math.round(bmp.height * scale))
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d')!.drawImage(bmp, 0, 0, w, h)
      const isPng = file.type === 'image/png'
      const blob = await new Promise<Blob>((res) =>
        canvas.toBlob((b) => res(b || file), isPng ? 'image/png' : 'image/jpeg', 0.82),
      )
      // if the smaller one is somehow bigger, just keep the original
      return blob.size < file.size ? { blob, type: isPng ? 'image/png' : 'image/jpeg' } : { blob: file, type: file.type }
    } finally {
      bmp.close()
    }
  }

  async function uploadFile(file: File, hint: string) {
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage')
    const storage = getStorage(getApp())
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const path = `${hint || 'draft'}/${Date.now()}-${safe}`
    setUploading(true)
    try {
      const { blob, type } = await compressImage(file)
      if (blob.size > 5 * 1024 * 1024) throw new Error('too-large')
      const snap = await uploadBytes(ref(storage, path), blob, { contentType: type })
      return await getDownloadURL(snap.ref)
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
      const url = await uploadFile(file, 'blog/cover')
      // ponytail: coverPath unused for deletion v1; keep url only
      setForm((f) => ({ ...f, coverUrl: url }))
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
      const url = await uploadFile(file, form.slug || slugify(form.title) || 'blog/inline')
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
      const { doc, getFirestore, serverTimestamp, setDoc } = await import('firebase/firestore')
      const db = getFirestore(getApp())
      const payload: Record<string, unknown> = {
        title,
        excerpt: form.excerpt.trim(),
        bodyMarkdown: form.body,
        coverImageUrl: form.coverUrl || null,
        coverImagePath: form.coverPath || null,
        status: form.status,
        updatedAt: serverTimestamp(),
      }
      // only set publishedAt when publishing, never overwrite once set
      if (form.status === 'published') payload.publishedAt = serverTimestamp()
      // keep createdAt on first create
      if (isNew) payload.createdAt = serverTimestamp()

      // ponytail: slug is doc ID. Renames not supported v1 — create new doc if slug changed on edit.
      const targetSlug = isNew ? slug : editing!.slug
      if (!isNew && slug !== editing!.slug) {
        // create new, delete old
        const { deleteDoc } = await import('firebase/firestore')
        await setDoc(doc(db, 'posts', slug), { ...payload, slug }, { merge: false })
        await deleteDoc(doc(db, 'posts', editing!.slug))
      } else {
        await setDoc(doc(db, 'posts', targetSlug), { ...payload, slug: targetSlug }, { merge: true })
      }
      await loadPosts()
      setEditing(null)
      setIsNew(false)
      setForm({ title: '', slug: '', excerpt: '', body: '', coverUrl: '', coverPath: '', status: 'draft' })
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return
    const { doc, deleteDoc, getFirestore } = await import('firebase/firestore')
    const db = getFirestore(getApp())
    await deleteDoc(doc(db, 'posts', slug))
    await loadPosts()
    if (editing?.slug === slug) {
      setEditing(null)
      setIsNew(false)
    }
  }

  if (authLoading) {
    return (
      <section className="py-20">
        <Container>
          <p className="text-sm text-taupe">Loading…</p>
        </Container>
      </section>
    )
  }

  if (!user) {
    return (
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-[420px] border border-hairline bg-white p-8 md:p-10">
            <h1 className="font-display text-2xl uppercase">Admin</h1>
            <p className="mt-2 text-sm text-taupe">Sign in to manage the journal.</p>
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div>
                <label className="micro mb-2 block text-ink">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={controlCls} placeholder="you@legalboutiqueadvisers.com" required />
              </div>
              <div>
                <label className="micro mb-2 block text-ink">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={controlCls} placeholder="••••••••" required />
              </div>
              {authError && <p className="micro text-oxblood">{authError}</p>}
              <button type="submit" className="micro w-full bg-ink py-3 text-cream hover:bg-oxblood transition-colors">
                Sign in
              </button>
            </form>
            <p className="mt-6 text-center text-[11px] text-taupe">
              <Link to="/" className="underline hover:text-ink">
                ← Back to site
              </Link>
            </p>
          </div>
        </Container>
      </section>
    )
  }

  const isEditing = editing !== null || isNew

  return (
    <section className="py-10 md:py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-6">
          <div>
            <h1 className="font-display text-2xl uppercase">Journal — Admin</h1>
            <p className="micro mt-1 text-taupe">Text + images v1. Markdown supported.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/blog" className="micro border border-hairline px-4 py-2 hover:bg-parchment transition-colors">
              View blog →
            </Link>
            <button onClick={handleLogout} className="micro border border-ink px-4 py-2 hover:bg-ink hover:text-cream transition-colors">
              Sign out
            </button>
          </div>
        </div>

        {!isEditing ? (
          <>
            <div className="mt-8 flex justify-between">
              <p className="micro text-taupe">{posts === null ? 'Loading…' : `${posts.length} posts`}</p>
              <button onClick={startNew} className="micro bg-oxblood px-6 py-3 text-cream hover:bg-ink transition-colors">
                + New post
              </button>
            </div>

            <div className="mt-6 divide-y divide-hairline border-y border-hairline">
              {posts === null && <p className="py-8 text-sm text-taupe">Loading…</p>}
              {posts !== null && posts.length === 0 && <p className="py-8 text-sm text-taupe">No posts yet. Create your first one.</p>}
              {posts?.map((p) => (
                <div key={p.slug} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="font-display uppercase leading-snug">{p.title || '(untitled)'}</p>
                    <p className="micro mt-1 flex gap-3 text-taupe">
                      <span>/{p.slug}</span>
                      <span className={p.status === 'published' ? 'text-oxblood' : ''}>● {p.status}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => startEdit(p)} className="micro border border-hairline px-3 py-2 hover:bg-parchment">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.slug)} className="micro border border-hairline px-3 py-2 text-oxblood hover:bg-parchment">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded border border-hairline bg-parchment/60 p-4 text-[12px] leading-relaxed text-taupe">
              <p className="font-display text-ink">How to add an image:</p>
              <p className="mt-1">Cover image → “Upload cover”. Inline → “Add image to body” (auto-inserts at your cursor). Images save to Firebase Storage under <code className="bg-parchment px-1">blog/…</code> and go live instantly — no redeploy needed.</p>
              <p className="mt-2 text-ink">Markdown: <code>**bold**</code>, <code>*italic*</code>, <code>[link](https://…)</code>, <code># H1</code>, <code>## H2</code>, <code>- list</code>, <code>---</code> rule, <code>![alt](url)</code> (auto via upload). Preview with the “Preview” toggle.</p>
            </div>
          </>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <div className="flex gap-3">
                <button onClick={() => { setEditing(null); setIsNew(false) }} className="micro border border-hairline px-4 py-2 hover:bg-parchment">
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
                    <label className="micro mb-2 block text-ink">Title *</label>
                    <input value={form.title} onChange={(e) => onTitleChange(e.target.value)} placeholder="My first post" className={controlCls} />
                  </div>
                  <div>
                    <label className="micro mb-2 block text-ink">Slug (URL)</label>
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
                    {!isNew && <p className="mt-1 text-[11px] text-taupe">Slug is locked after creation. Change it to create a new URL (old URL will break).</p>}
                  </div>
                  <div>
                    <label className="micro mb-2 block text-ink">Excerpt (shows on list + SEO)</label>
                    <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={2} placeholder="One sentence that invites the reader…" className={controlCls} maxLength={260} />
                    <p className="mt-1 text-right text-[11px] text-taupe">{form.excerpt.length}/260</p>
                  </div>

                  <div>
                    <label className="micro mb-2 block text-ink">Cover image</label>
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
                          className="micro shrink-0 border border-hairline px-4 py-2 hover:bg-parchment"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-taupe">JPG or PNG, under 5MB. ~1600px wide recommended.</p>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="micro block text-ink">Body (Markdown + images)</label>
                      <label className="micro inline-flex cursor-pointer items-center border border-hairline bg-white px-3 py-1.5 hover:bg-parchment text-[10px]">
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
                    <p className="mt-1 text-[11px] text-taupe">Click “Add image to body” to upload and insert at your cursor. <span className="text-ink">**bold**</span>, <code className="bg-parchment px-1">*italic*</code>, <code className="bg-parchment px-1"># H1</code>, <code className="bg-parchment px-1">- list</code></p>
                  </div>

                  <div className="flex items-center gap-3 border border-hairline bg-parchment/50 p-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={form.status === 'published'} onChange={(e) => setForm((f) => ({ ...f, status: e.target.checked ? 'published' : 'draft' }))} className="h-4 w-4 accent-oxblood" />
                      <span className="micro text-ink">Published</span>
                    </label>
                    <span className="text-[11px] text-taupe">{form.status === 'published' ? 'Visible at /blog' : 'Draft — only you can see it'}</span>
                  </div>

                  {saveError && <p className="micro text-oxblood">{saveError}</p>}

                  <div className="flex gap-3">
                    <button onClick={handleSave} disabled={saving || uploading} className="micro flex-1 bg-oxblood py-3 text-cream hover:bg-ink disabled:opacity-50">
                      {saving ? 'Saving…' : form.status === 'published' ? 'Save & publish' : 'Save draft'}
                    </button>
                    <button onClick={() => { setEditing(null); setIsNew(false) }} className="micro border border-hairline px-6 py-3 hover:bg-parchment">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="border border-hairline bg-white p-6">
                  <p className="micro text-taupe">Preview</p>
                  <h2 className="font-display mt-2 text-2xl uppercase">{form.title || '(no title)'}</h2>
                  {form.excerpt && <p className="mt-3 font-display italic text-taupe">{form.excerpt}</p>}
                  {form.coverUrl && <img src={form.coverUrl} alt="" className="mt-6 w-full object-cover" />}
                  <div className="blog-content mt-6" dangerouslySetInnerHTML={{ __html: renderMarkdown(form.body || '*Nothing yet*') }} />
                </div>
              )}
            </div>

            {/* live preview sidebar on desktop when not in preview mode */}
            {!preview && (
              <div className="hidden lg:block">
                <div className="sticky top-24 border border-hairline bg-white p-6">
                  <p className="micro text-taupe">Live preview</p>
                  <h3 className="font-display mt-2 uppercase leading-snug">{form.title || '(no title)'}</h3>
                  {form.excerpt && <p className="mt-2 text-[13px] italic text-taupe">{form.excerpt}</p>}
                  <div className="blog-content mt-4 max-h-[60vh] overflow-auto pr-2 text-sm" dangerouslySetInnerHTML={{ __html: renderMarkdown(form.body || '*Start writing…*') }} />
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}

// default export for lazy()
export default AdminPage
