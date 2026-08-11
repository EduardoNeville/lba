import { Container } from '../ui/Container'

export function CrossLinkBand({ left, center, right }: { left: React.ReactNode; center: React.ReactNode; right: React.ReactNode }) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
          <div>{left}</div>
          <div className="mx-auto w-full max-w-[380px] lg:w-[340px]">
            <div className="aspect-[3/4] overflow-hidden lg:aspect-auto lg:h-full">
              {center}
            </div>
          </div>
          <div>{right}</div>
        </div>
      </Container>
    </section>
  )
}
