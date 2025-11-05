import type { ReactNode } from "react"

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
  return <button type="submit" className="bg-zinc-200 text-zinc-900 px-4 py-2 rounded-lg">{children}</button>
}