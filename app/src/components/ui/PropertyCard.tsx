import { Link } from 'react-router-dom'
import { ArrowLink } from './ArrowLink'

export function PropertyCard({
  image,
  alt,
  title,
  meta,
  slug,
  showLink = false,
}: {
  image?: string
  alt?: string
  title: string
  meta: string
  slug: string
  showLink?: boolean
}) {
  return (
    <Link to={slug} className="group block">
      {image && (
        <div className="overflow-hidden">
          <img src={image} alt={alt ?? ''} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className="mt-3 flex items-baseline justify-between">
        <span className="micro text-[11px] text-ink">{title}</span>
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-taupe">{meta}</p>
      {showLink && (
        <div className="mt-3">
          <ArrowLink to={slug}>View residence</ArrowLink>
        </div>
      )}
    </Link>
  )
}
