export function Container({ children, wide, narrow }: { children: React.ReactNode; wide?: boolean; narrow?: boolean }) {
  return (
    <div
      className={`mx-auto w-full ${narrow ? "px-3 md:px-6" : "px-6 md:px-10"} ${wide ? "max-w-[1440px]" : "max-w-[1200px]"}`}
    >
      {children}
    </div>
  )
}
