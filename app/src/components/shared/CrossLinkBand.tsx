import { Container } from '../ui/Container'

export function CrossLinkBand({ left, center, right }: { left: React.ReactNode; center: React.ReactNode; right: React.ReactNode }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid items-stretch gap-10 lg:grid-cols-[1fr_380px_1fr] lg:gap-14">
          <div className="flex flex-col justify-center">{left}</div>
          <div className="overflow-hidden">
            <div className="h-full min-h-[380px]">{center}</div>
          </div>
          <div className="flex flex-col justify-center">{right}</div>
        </div>
      </Container>
    </section>
  )
}
