import { firestoreDb, getApp } from './firebase'

export type MediaKind = 'blog' | 'properties'

export interface UploadedImage {
  url: string
  path: string
}

const MAX_EDGE = 1600 // long edge, px
const MAX_BYTES = 5 * 1024 * 1024

// ponytail: resize+compress on the client so stored & egress bytes shrink ~5-10x,
// which is the real spend cap (Stored $0.026/GB, download $0.12/GB).
export async function compressImage(file: File): Promise<{ blob: Blob; type: string }> {
  if (file.type === 'image/svg+xml') return { blob: file, type: file.type }
  const bmp = await createImageBitmap(file).catch(() => null)
  if (!bmp) return { blob: file, type: file.type } // decode failed, send original
  try {
    const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height))
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

// Every upload must land under a prefix storage.rules allows, which is why the
// path is built here and nowhere else:
//   blog/…        journal cover + inline images
//   properties/…  residence galleries
// Dev uploads are namespaced under dev/ so the shared bucket never mixes dev
// test photos with live assets (the Firestore database is dev, the bucket is not).
export function mediaPath(kind: MediaKind, scope: string, fileName: string): string {
  const cleanScope = scope.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/^_+|_+$/g, '') || 'draft'
  const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_') || 'image.jpg'
  const dev = firestoreDb ? 'dev/' : ''
  return `${dev}${kind}/${cleanScope}/${Date.now()}-${cleanName}`
}

export async function uploadImage(file: File, kind: MediaKind, scope: string): Promise<UploadedImage> {
  if (!file.type.startsWith('image/')) throw new Error('not-an-image')
  if (file.size > MAX_BYTES) throw new Error('too-large')
  const { getDownloadURL, getStorage, ref, uploadBytes } = await import('firebase/storage')
  const path = mediaPath(kind, scope, file.name)
  const { blob, type } = await compressImage(file)
  const snap = await uploadBytes(ref(getStorage(getApp()), path), blob, { contentType: type })
  return { url: await getDownloadURL(snap.ref), path }
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
