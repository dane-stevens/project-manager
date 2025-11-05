import type { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="text-4xl text-center mb-8">{children}</h1>
}
export function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-xl">{children}</h2>
}