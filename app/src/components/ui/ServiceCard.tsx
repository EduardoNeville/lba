import { Link } from 'react-router-dom'
import { ArrowLink } from './ArrowLink'
import { Checklist } from './Checklist'

export function ServiceCard({
  image,
  alt,
  title,
  body,
  checks,
  link,
}: {
  image?: string
  alt?: string
  title: string
  body: string
  checks?: string[]
  link: string
}) {
  return (
    <Link to={link} className="group flex flex-col">
      {image && (
        <div className="overflow-hidden">
          <img src={image} alt={alt ?? ''} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
      )}
      <h3 className="font-display mt-5 text-sm uppercase tracking-[0.15em]">{title}</h3>
      <p className="mt-3 text-[13px] leading-relaxed text-taupe">{body}</p>
      {checks && <div className="mt-4"><Checklist items={checks} /></div>}
      <div className="mt-auto pt-4">
        <ArrowLink to={link}>Learn more</ArrowLink>
      </div>
    </Link>
  )
}
