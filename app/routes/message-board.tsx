import { auth } from "~/utils/session.server";
import type { Route } from "./+types/message-board";
import { db } from "~/utils/db.server";
import { href, Link, redirect, useParams } from "react-router";
import { Spacing } from "~/components/Spacing";
import { H1, H2 } from "~/components/Headings";
import { intlFormat, parseJSON } from 'date-fns'
import { UTCDate } from '@date-fns/utc'
import { sql } from "drizzle-orm";

export async function loader({ request, params }: Route.LoaderArgs) {
  await auth(request)

  const messageBoard = await db.query.messageBoards.findFirst({
    where: (messageBoards, { eq }) => eq(messageBoards.hId, params.messageBoard_hId),
    with: {
      project: true,
      messages: {
        columns: {
          id: true,
          hId: true,
          title: true,
          createdAt: true
        },
        orderBy: (messages, { desc }) => desc(messages.id)
      },
    }
  })

  if (!messageBoard) return redirect(href("/project/:project_hId", { project_hId: params.project_hId }))

  return {
    messageBoard
  }
}

export function ServerComponent({ loaderData, params }: Route.ComponentProps) {
  const { messageBoard } = loaderData
  return (
    <div className="">

      <H1>{messageBoard.title}</H1>
      <Link to={href("/project/:project_hId/message-board/:messageBoard_hId/new", { project_hId: params.project_hId, messageBoard_hId: params.messageBoard_hId })}>New Message</Link>
      <Spacing>
        {messageBoard?.messages?.map((message) => {
          return (
            <Link key={message.id} to={href("/project/:project_hId/message-board/:messageBoard_hId/message/:message_hId", { project_hId: params.project_hId, messageBoard_hId: params.messageBoard_hId, message_hId: message.hId })} className="bg-zinc-900 px-4 py-2 rounded-lg">
              <H2>{message.title}</H2>
              <div className="text-zinc-500 text-sm">{intlFormat(message.createdAt, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</div>
            </Link>
          )
        })}
      </Spacing>
    </div>
  )
}