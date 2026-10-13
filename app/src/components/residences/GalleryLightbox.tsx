import { useEffect } from 'react'
import { Carousel } from '../ui/Carousel'
import type { PropertyImage } from '../../lib/properties'
import { useResidencesCopy } from '../../lib/residencesCopy'

// The full-screen view: the large rendition, contained in the viewport so nothing is
// cropped, with the thumbnails and the count. Escape and the close button leave, and
// page scrolling is held while it is open. Arrows, swiping and the keyboard work
// because it is the same carousel as the gallery.
export function GalleryLightbox({
  images,
  title,
  index,
  onIndexChange,
  onClose,
}: {
  images: PropertyImage[]
  title: string
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}) {
  const copy = useResidencesCopy()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  const labels = { previous: copy.gallery.previous, next: copy.gallery.next, pause: '', play: '' }

  return (
    <div role="dialog" aria-modal="true" aria-label={copy.gallery.label} className="fixed inset-0 z-[60] flex flex-col bg-ink">
      <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 md:px-6">
        <p className="micro text-[10px] text-cream/70">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="micro min-h-11 border border-cream/40 px-4 text-[10px] text-cream transition-colors hover:bg-cream hover:text-ink"
        >
          {copy.gallery.close}
        </button>
      </div>

      <div className="min-h-0 flex-1">
        <Carousel
          items={images}
          ariaLabel={copy.gallery.label}
          labels={labels}
          index={index}
          onIndexChange={onIndexChange}
          loop
          className="h-full"
          trackClassName="h-full"
          itemClassName="basis-full h-full"
          renderItem={(image, imageIndex) => (
            <img
              src={image.url}
              alt={image.alt || title}
              loading={imageIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-contain"
            />
          )}
        />
      </div>

      <div className="shrink-0 px-4 pb-4 md:px-6 md:pb-6">
        <Carousel
          items={images}
          ariaLabel={copy.gallery.thumbnails}
          labels={labels}
          arrows="never"
          index={index}
          onIndexChange={onIndexChange}
          trackClassName="gap-2"
          itemClassName="basis-1/4 sm:basis-1/6 lg:basis-[8%]"
          renderItem={(image, imageIndex) => (
            <button
              type="button"
              onClick={() => onIndexChange(imageIndex)}
              aria-label={`${copy.gallery.viewImage} ${imageIndex + 1}`}
              aria-current={imageIndex === index}
              className={`block w-full border transition-colors ${
                imageIndex === index ? 'border-cream' : 'border-transparent hover:border-cream/40'
              }`}
            >
              {/* The small rendition: thumbnails should never cost more than the
                  photograph they lead to. */}
              <img
                src={image.cardUrl || image.url}
                alt=""
                aria-hidden
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </button>
          )}
        />
      </div>
    </div>
  )
}
