import { firestoreDb, getApp } from './firebase'

export type MediaKind = 'blog' | 'properties'

export interface UploadedImage {
  url: string
  path: string
}

/** A photograph stored as two renditions: the large one is what the full-screen
 *  viewer shows, the small one is what grids, strips and thumbnails download. */
export interface UploadedImageSet extends UploadedImage {
  cardUrl: string
  cardPath: string
}

// What the admin accepts from a file picker, and what Storage will take after the
// browser has done its own reducing (storage.rules mirrors MAX_STORED_BYTES).
export const MAX_INPUT_BYTES = 60 * 1024 * 1024
export const MAX_STORED_BYTES = 12 * 1024 * 1024

const LARGE_EDGE = 1800 // full-screen view
const SMALL_EDGE = 900 // cards, strips, thumbnails
const BLOG_EDGE = 1600
const QUALITY = 0.84

interface Rendered {
  blob: Blob
  type: string
}

const canvasToBlob = (canvas: HTMLCanvasElement, type: string) =>
  new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('encode-failed'))), type, QUALITY),
  )

// Decode once, then draw each rendition straight from the decoded pixels — the
// browser's own resampler does the work, so a 40MP phone photograph never has to
// travel up the wire. EXIF rotation is honoured, which older browsers ignored.
async function render(file: File, edges: number[]): Promise<Rendered[]> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' }).catch(() => null)
  if (!bitmap) throw new Error('undecodable')
  try {
    const isPng = file.type === 'image/png'
    const type = isPng ? 'image/png' : 'image/jpeg'
    return await Promise.all(
      edges.map(async (edge) => {
        const scale = Math.min(1, edge / Math.max(bitmap.width, bitmap.height))
        const width = Math.max(1, Math.round(bitmap.width * scale))
        const height = Math.max(1, Math.round(bitmap.height * scale))
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d')!.drawImage(bitmap, 0, 0, width, height)
        const blob = await canvasToBlob(canvas, type)
        // Never send something bigger than the original.
        return blob.size < file.size ? { blob, type } : { blob: file, type: file.type }
      }),
    )
  } finally {
    bitmap.close()
  }
}

// Every upload must land under a prefix storage.rules allows, which is why the
// path is built here and nowhere else:
//   blog/…        journal cover + inline images
//   properties/…  residence galleries
// Dev uploads are namespaced under dev/ so the shared bucket never mixes dev
// test photos with live assets (the Firestore database is dev, the bucket is not).
export function mediaPath(kind: MediaKind, scope: string, fileName: string, variant?: string): string {
  const cleanScope = scope.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/^_+|_+$/g, '') || 'draft'
  const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_') || 'image.jpg'
  const tag = variant ? `${variant}-` : ''
  const dev = firestoreDb ? 'dev/' : ''
  return `${dev}${kind}/${cleanScope}/${Date.now()}-${tag}${cleanName}`
}

async function put(path: string, blob: Blob, type: string): Promise<UploadedImage> {
  const { getDownloadURL, getStorage, ref, uploadBytes } = await import('firebase/storage')
  const snap = await uploadBytes(ref(getStorage(getApp()), path), blob, { contentType: type })
  return { url: await getDownloadURL(snap.ref), path }
}

function assertUploadable(file: File): void {
  if (!file.type.startsWith('image/')) throw new Error('not-an-image')
  if (file.size > MAX_INPUT_BYTES) throw new Error('too-large-input')
}

/** One rendition — the journal's covers and inline images. */
export async function uploadImage(file: File, kind: MediaKind, scope: string): Promise<UploadedImage> {
  assertUploadable(file)
  const [rendered] = file.type === 'image/svg+xml' ? [{ blob: file, type: file.type }] : await render(file, [BLOG_EDGE])
  return put(mediaPath(kind, scope, file.name), rendered.blob, rendered.type)
}

/** Two renditions of one photograph — the residences' galleries. */
export async function uploadImageSet(file: File, kind: MediaKind, scope: string): Promise<UploadedImageSet> {
  assertUploadable(file)
  if (file.type === 'image/svg+xml') {
    const single = await put(mediaPath(kind, scope, file.name), file, file.type)
    return { ...single, cardUrl: single.url, cardPath: single.path }
  }
  const [large, small] = await render(file, [LARGE_EDGE, SMALL_EDGE])
  const [full, card] = await Promise.all([
    put(mediaPath(kind, scope, file.name, 'full'), large.blob, large.type),
    put(mediaPath(kind, scope, file.name, 'card'), small.blob, small.type),
  ])
  return { url: full.url, path: full.path, cardUrl: card.url, cardPath: card.path }
}

// Removing a Storage object is best-effort: a failed delete must never block a
// save, and the lifecycle rule is the backstop for orphans (docs/09 §C).
export async function deleteObject(path: string): Promise<void> {
  try {
    const { deleteObject: remove, getStorage, ref } = await import('firebase/storage')
    await remove(ref(getStorage(getApp()), path))
  } catch {
    /* object already gone, or rules deny it — nothing to recover here */
  }
}
