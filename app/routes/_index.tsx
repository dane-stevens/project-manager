import { db } from "~/utils/db.server";
import type { Route } from "./+types/_index";
import { users } from "drizzle/schema";
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

export async function ServerComponent() {
  const user = await db.query.users.findFirst()
  console.log(user)
  return (
    <div>{JSON.stringify(user)}</div>
  )
}
