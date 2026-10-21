import { Container } from '../ui/Container'

export function CrossLinkBand({ left, right, narrow }: { left: React.ReactNode; right: React.ReactNode; narrow?: boolean }) {
  return (
    <section className="py-20 md:py-28">
      <Container narrow={narrow}>
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">{left}</div>
          <div className="flex flex-col justify-center">{right}</div>
        </div>
      </Container>
    </section>
  )
}
