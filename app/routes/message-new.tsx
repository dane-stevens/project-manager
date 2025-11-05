import { Form, href, redirect, useFetcher } from "react-router";
import { Editor } from "~/components/Editor.client";
import { canUseDOM } from "~/utils/browser.client";

import styles from "@blocknote/mantine/style.css?url"
import fontStyles from "@blocknote/core/fonts/inter.css?url"
import { H1 } from "~/components/Headings";
import { Field, Submit } from "~/components/Forms";
import { Spacing } from "~/components/Spacing";
import type { Route } from "./+types/message-new";
import z from "zod";
import { toast } from "sonner";
import { useEffect } from "react";
import { db } from "~/utils/db.server";
import { messages } from "drizzle/schema";
import { createId } from "@paralleldrive/cuid2";


export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles
    },
    {
      rel: "stylesheet",
      href: fontStyles
    }
  ]
}

const Payload = z.object({
  title: z.string().min(1),
  editorContent: z.string().min(1).transform(val => JSON.parse(val))
})

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData()
  const parsedData = Payload.safeParse(Object.fromEntries(formData))

  if (!parsedData.success) {
    return {
      error: z.flattenError(parsedData.error),
      message: 'There was an error.'
    }
  }

  const { data } = parsedData

  const messageBoard = await db.query.messageBoards.findFirst({
    where: (messageBoards, { eq }) => eq(messageBoards.hId, params.messageBoard_hId),
    columns: {
      id: true
    }
  })

  if (!messageBoard) return redirect(href("/project/:project_hId", { project_hId: params.project_hId }))

  const hId = createId()

  await db.insert(messages).values({
    hId,
    messageBoardId: messageBoard.id,
    title: data.title,
    raw: data.editorContent.raw,
    html: data.editorContent.html,
    markdown: data.editorContent.markdown
  })

  return redirect(href("/project/:project_hId/message-board/:messageBoard_hId/message/:message_hId", { project_hId: params.project_hId, messageBoard_hId: params.messageBoard_hId, message_hId: hId }))

}



export default function NewMessage() {
  const fetcher = useFetcher()

  useEffect(() => {

    if (fetcher.data?.error) {
      toast(fetcher.data.message)
    }
  }, [fetcher.data])

  return (
    <div>
      <H1>New Message</H1>
      <fetcher.Form method="post">
        <Spacing>
          <Field type="text" name="title" placeholder="Title" />
          {canUseDOM && <Editor />}
          <div>
            <Submit>Save as Draft</Submit>
          </div>
        </Spacing>
      </fetcher.Form>
    </div>
  )
}

