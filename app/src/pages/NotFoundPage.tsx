import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { setPageMeta } from '../lib/seo'

export function NotFoundPage() {
  useEffect(() => {
    setPageMeta('Page not found · Legal Boutique Advisers', 'The page you were looking for does not exist.')
  }, [])

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="micro text-taupe">Page not found</p>
          <h1 className="font-display mt-4 text-3xl uppercase leading-[1.08] tracking-wide md:text-5xl">
            This page does not exist.
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-taupe">
            The address may have changed or been removed. Head back to our
            homepage or make a private enquiry and we will point you the right way.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/" className="micro inline-block border border-ink px-6 py-3 transition-colors hover:bg-ink hover:text-cream">
              Back to homepage
            </Link>
            <Link to="/inquiry" className="micro inline-block bg-oxblood px-6 py-3 text-cream transition-colors hover:bg-ink">
              Make an enquiry
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}