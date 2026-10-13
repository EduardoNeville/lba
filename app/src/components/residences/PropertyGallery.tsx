import { useState } from 'react'
import { Carousel } from '../ui/Carousel'
import { ScrollCue } from '../ui/ScrollCue'
import { GalleryLightbox } from './GalleryLightbox'
import type { PropertyImage } from '../../lib/properties'
import { useResidencesCopy } from '../../lib/residencesCopy'

// The photographs of a residence, one screen tall.
//
// The page floats its own panel over the bottom of this (title, summary, price and
// enquiry) by passing children, and its own top-left control — the way back to the
// listing — through topLeft, so the gallery itself stays a gallery.
export function PropertyGallery({
  images,
  title,
  topLeft,
  children,
}: {
  images: PropertyImage[]
  title: string
  topLeft?: React.ReactNode
  children?: React.ReactNode
}) {
  const copy = useResidencesCopy()
  const [index, setIndex] = useState(0)
  const [fullScreen, setFullScreen] = useState(false)

  if (images.length === 0) return null

  const labels = { previous: copy.gallery.previous, next: copy.gallery.next, pause: '', play: '' }

  return (
    <section className="relative hero-screen overflow-hidden bg-ink">
      <Carousel
        items={images}
        ariaLabel={copy.gallery.label}
        labels={labels}
        index={index}
        onIndexChange={setIndex}
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
            fetchPriority={imageIndex === 0 ? 'high' : 'auto'}
            className="h-full w-full object-cover"
          />
        )}
      />

      {topLeft && <div className="absolute left-3 top-3 z-20 md:left-4 md:top-4">{topLeft}</div>}

      <div className="absolute right-3 top-3 z-20 flex items-center gap-2 md:right-4 md:top-4">
        <p className="micro border border-cream/30 bg-ink/40 px-3 py-2 text-[10px] text-cream/90 backdrop-blur-sm">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={() => setFullScreen(true)}
          className="micro min-h-11 border border-cream/40 bg-ink/40 px-4 py-2 text-[10px] text-cream backdrop-blur-sm transition-colors hover:bg-cream hover:text-ink"
        >
          {copy.gallery.fullScreen}
        </button>
      </div>

      {children && <div className="absolute inset-x-0 bottom-0 z-20 pb-16 md:pb-20">{children}</div>}

      {/* The same cue the heros use, kept clear of the panel above it. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center">
        <div className="pointer-events-auto">
          <ScrollCue tone="light" />
        </div>
      </div>

      {fullScreen && (
        <GalleryLightbox
          images={images}
          title={title}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setFullScreen(false)}
        />
      )}
    </section>
  )
}
