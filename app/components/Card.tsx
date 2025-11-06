import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="card rounded-xl ring-1 ring-neutral-800">
      <div className="rounded-[inherit]  bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 px-4 py-2">
        {children}
      </div>
    </div>
  )
}