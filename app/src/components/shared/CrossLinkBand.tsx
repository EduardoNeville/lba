import { Container } from '../ui/Container'

export function CrossLinkBand({ left, center, right, size = "lg", narrow }: { left: React.ReactNode; center: React.ReactNode; right: React.ReactNode; size?: "lg" | "sm"; narrow?: boolean }) {
  return (
    <section className="py-20 md:py-28">
      <Container narrow={narrow}>
        <div
          className={`grid items-stretch gap-8 lg:gap-10 ${size === "sm" ? "lg:grid-cols-[1fr_300px_1fr]" : "lg:grid-cols-[1fr_380px_1fr]"}`}
        >
          <div className="flex flex-col justify-center">{left}</div>
          <div className="overflow-hidden">
            <div className={`h-full ${size === "sm" ? "min-h-[300px]" : "min-h-[380px]"}`}>
              {center}
            </div>
          </div>
          <div className="flex flex-col justify-center">{right}</div>
        </div>
      </Container>
    </section>
  )
}
