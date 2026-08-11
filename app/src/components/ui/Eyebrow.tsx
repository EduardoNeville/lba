export function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p className={`micro flex items-center gap-3 text-ink ${center ? 'justify-center' : ''}`}>
      <span aria-hidden className="h-px w-8 bg-ink/60" />
      {children}
    </p>
  )
}
