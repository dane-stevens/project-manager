import { Form } from "react-router";
import type { Route } from "./+types/login";
import { createUserSession } from "~/utils/session.server";
import { db } from "~/utils/db.server";
import { users } from "drizzle/schema";

export async function loader({ request }) {

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, 'dane@dsmedia.ca')
  })
  if (!user) {
    await db.insert(users).values({
      username: 'dane@dsmedia.ca',
    })
  }
  return {}
}

export async function action({ request }: Route.ActionArgs) {

  const formData = await request.formData()

  const username = formData.get('username')

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username)
  })

  return createUserSession(request, '/', {
    hId: user.hId,
    userType: 'ADMIN',
    username: user.username,
  })
}

export default function Login() {
  return (
    <Form method="POST">
      <input type="email" name="username" />
      <button type="submit">Log in</button>
    </Form>
  )
}