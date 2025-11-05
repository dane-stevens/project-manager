import { Outlet } from "react-router";

export default function AuthorizedLayout() {
  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-4 py-16 grid">
      <Outlet />
    </div>
  )
}