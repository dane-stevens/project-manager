import { db } from "~/utils/db.server";
import type { Route } from "./+types/message";
import { href, redirect } from "react-router";
import { H1 } from "~/components/Headings";

export async function loader({ request, params }: Route.LoaderArgs) {

  const message = await db.query.messages.findFirst({
    where: (messages, { eq }) => eq(messages.hId, params.message_hId)
  })

  if (!message) return redirect(href("/project/:project_hId/message-board/:messageBoard_hId", { project_hId: params.project_hId, messageBoard_hId: params.messageBoard_hId }))

  return { message }

}

export function ServerComponent({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData
  return (
    <div>
      <H1>{message.title}</H1>
      <div dangerouslySetInnerHTML={{ __html: message.html }}></div>
    </div>
  )
}