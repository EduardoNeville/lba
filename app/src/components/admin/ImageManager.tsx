import { useState } from 'react'
import { MAX_INPUT_BYTES, uploadImageSet } from '../../lib/media'
import type { PropertyImage } from '../../lib/properties'
import { btnCls, hintCls } from './styles'

const MAX_IMAGES = 20

// The photograph field of a residence: several files at once, reorder, choose the
// cover, remove, and a description per photograph (the alt text the public page
// uses when a photograph fails, is read aloud, or is indexed).
export function ImageManager({
  images,
  scope,
  onChange,
  onError,
}: {
  images: PropertyImage[]
  /** Storage folder for this residence — its slug, or "draft" before it is named. */
  scope: string
  onChange: (images: PropertyImage[]) => void
  onError: (message: string) => void
}) {
  const [uploading, setUploading] = useState<{ done: number; total: number } | null>(null)

  async function onFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0) return

    const room = MAX_IMAGES - images.length
    if (room <= 0) {
      onError(`A residence can hold up to ${MAX_IMAGES} photographs.`)
      return
    }
    if (files.length > room) onError(`Only ${room} more photograph(s) will fit — the rest were skipped.`)

    const queue = files.slice(0, room)
    setUploading({ done: 0, total: queue.length })
    const added: PropertyImage[] = []
    for (const [index, file] of queue.entries()) {
      try {
        // Two renditions per photograph: full size for the viewer, reduced for the
        // grids. Both are produced in the browser from the original file.
        const uploaded = await uploadImageSet(file, 'properties', scope)
        added.push({
          url: uploaded.url,
          path: uploaded.path,
          cardUrl: uploaded.cardUrl,
          cardPath: uploaded.cardPath,
          alt: '',
        })
      } catch (err) {
        const reason =
          err instanceof Error && err.message === 'too-large-input'
            ? `is larger than ${Math.round(MAX_INPUT_BYTES / 1024 / 1024)}MB`
            : err instanceof Error && err.message === 'undecodable'
              ? 'could not be read as an image'
              : 'could not be uploaded'
        onError(`${file.name} ${reason}.`)
      }
      setUploading({ done: index + 1, total: queue.length })
    }
    setUploading(null)
    if (added.length > 0) onChange([...images, ...added])
  }

  function move(index: number, direction: -1 | 1) {
    const next = [...images]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  function makeCover(index: number) {
    const next = [...images]
    const [chosen] = next.splice(index, 1)
    onChange([chosen, ...next])
  }

  function setAlt(index: number, alt: string) {
    onChange(images.map((image, i) => (i === index ? { ...image, alt } : image)))
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="micro inline-flex cursor-pointer items-center border border-hairline bg-white px-4 py-2 hover:bg-parchment">
          {uploading ? `Uploading ${uploading.done}/${uploading.total}…` : images.length > 0 ? 'Add photographs' : 'Upload photographs'}
          <input type="file" accept="image/*" multiple onChange={onFiles} className="hidden" disabled={uploading !== null} />
        </label>
        <p className={hintCls}>
          {images.length}/{MAX_IMAGES} · JPG, PNG or a camera file up to{' '}
          {Math.round(MAX_INPUT_BYTES / 1024 / 1024)}MB. Each one is reduced to 1800px for the
          full-screen view and 900px for the grids, on the way up. The first photograph is the cover.
        </p>
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={image.url} className="border border-hairline bg-white">
              <div className="relative">
                <img src={image.url} alt="" className="aspect-[4/3] w-full object-cover" />
                {index === 0 && (
                  <span className="micro absolute left-2 top-2 border border-oxblood bg-cream/90 px-2 py-1 text-[9px] text-oxblood">
                    Cover
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1 p-2">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move photograph ${index + 1} earlier`}
                  className={`${btnCls} px-2 disabled:opacity-30`}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === images.length - 1}
                  aria-label={`Move photograph ${index + 1} later`}
                  className={`${btnCls} px-2 disabled:opacity-30`}
                >
                  →
                </button>
                {index > 0 && (
                  <button type="button" onClick={() => makeCover(index)} className={btnCls}>
                    Make cover
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onChange(images.filter((_, i) => i !== index))}
                  className={`${btnCls} text-oxblood`}
                >
                  Remove
                </button>
              </div>
              <input
                value={image.alt ?? ''}
                onChange={(event) => setAlt(index, event.target.value)}
                placeholder="Describe this photograph"
                aria-label={`Description of photograph ${index + 1}`}
                className="w-full border-t border-hairline px-3 py-2 text-[12px] text-ink placeholder:text-taupe/60 focus:border-oxblood focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
