import type { ReactNode } from "react"
import { useFetchers } from "react-router"

export function Field({
  type,
  name,
  placeholder
}) {

  return (
    <div className="border rounded-lg border-zinc-800">
      {
        type === 'textarea' ? (
          <textarea name={name} placeholder={placeholder} rows={8} className="w-full block px-4 py-2">
          </textarea>
        ) : (
          <input type={type} name={name} placeholder={placeholder} className="px-4 py-2 w-full" />
        )
      }
    </div>
  )
}

export function Submit({ children }: { children: ReactNode }) {
  const fetchers = useFetchers()
  const fetcher = fetchers?.[0]
  const isLoading = ['loading', 'submitting'].includes(fetcher?.state)
  return <button type="submit" className="bg-zinc-200 text-zinc-900 px-4 py-2 rounded-lg disabled:text-red-600" disabled={isLoading}>{children}</button>
}