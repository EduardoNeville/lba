import { useId } from 'react'

export function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: (id: string) => React.ReactNode
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="micro mb-2 block text-ink">
        {label}
      </label>
      {children(id)}
      {error && (
        <p id={`${id}-error`} role="alert" className="micro mt-2 text-[9px] text-oxblood">
          {error}
        </p>
      )}
    </div>
  )
}
