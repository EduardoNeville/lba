import { Container } from './Container'

export function StatementBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <p className="font-display mx-auto max-w-3xl text-center text-xl leading-snug text-ink md:text-2xl">
          {children}
        </p>
      </Container>
    </section>
  )
}
