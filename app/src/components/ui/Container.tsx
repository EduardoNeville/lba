export function Container({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`mx-auto w-full px-6 md:px-10 ${wide ? 'max-w-[1440px]' : 'max-w-[1200px]'}`}>
      {children}
    </div>
  )
}
