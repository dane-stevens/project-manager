export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg bg-zinc-900 px-4 py-2">
      {children}
    </div>
  )
}