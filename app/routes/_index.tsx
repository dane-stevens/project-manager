import type { Route } from "./+types/_index";
import { auth } from "~/utils/session.server";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Project MGR" },
    { name: "description", content: "Project MGR" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await auth(request)
  return {}
}

export default function Dashboard() {
  return (
    <div>hello</div>
  )
}
