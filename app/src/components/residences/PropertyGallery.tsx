import { useState } from 'react'
import { Carousel } from '../ui/Carousel'
import type { PropertyImage } from '../../lib/properties'
import { useResidencesCopy } from '../../lib/residencesCopy'

// The photographs of a residence: one large image at a time with a counter, arrows
// and a thumbnail strip. Both carousels share one index, so clicking a thumbnail
// moves the big image and swiping the big image moves the highlight.
export function PropertyGallery({ images, title }: { images: PropertyImage[]; title: string }) {
  const copy = useResidencesCopy()
  const [index, setIndex] = useState(0)

  if (images.length === 0) return null

  const labels = { previous: copy.gallery.previous, next: copy.gallery.next, pause: '', play: '' }

  return (
    <div>
      <Carousel
        items={images}
        ariaLabel={copy.gallery.label}
        labels={labels}
        index={index}
        onIndexChange={setIndex}
        loop
        counter
        renderItem={(image, imageIndex) => (
          <img
            src={image.url}
            alt={image.alt ?? title}
            loading={imageIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={imageIndex === 0 ? 'high' : 'auto'}
            className="aspect-[4/3] w-full bg-parchment object-cover md:aspect-[16/9]"
          />
        )}
      />

      {images.length > 1 && (
        <Carousel
          items={images}
          ariaLabel={copy.gallery.thumbnails}
          labels={labels}
          arrows="never"
          index={index}
          onIndexChange={setIndex}
          trackClassName="mt-2 gap-2"
          itemClassName="basis-1/4 sm:basis-1/6 lg:basis-[12.5%]"
          renderItem={(image, imageIndex) => (
            <button
              type="button"
              onClick={() => setIndex(imageIndex)}
              aria-label={`${copy.gallery.viewImage} ${imageIndex + 1}`}
              aria-current={imageIndex === index}
              className={`block w-full border transition-colors ${
                imageIndex === index ? 'border-oxblood' : 'border-transparent hover:border-taupe'
              }`}
            >
              <img src={image.url} alt="" aria-hidden className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </button>
          )}
        />
      )}
    </div>
  )
}
