
import { Form, href, Link, redirect } from "react-router";
import { Field, Submit } from "~/components/Forms";
import { messageBoards, projects } from "drizzle/schema";
import { db } from "~/utils/db.server";
import type { Route } from "./+types/project-new";
import { H1 } from "~/components/Headings";
import { Spacing } from "~/components/Spacing";
import { createId } from "@paralleldrive/cuid2";


export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  const data = Object.fromEntries(formData)
  const hId = createId()

  const project = await db.insert(projects).values({
    hId: hId,
    name: data.name,
    description: data.description
  }).$returningId()

  await db.insert(messageBoards).values({
    title: 'Message Board',
    projectId: project[0].id
  })

  return redirect(href("/project/:project_hId", { project_hId: hId }))

}

export default function NewProject() {
  return (
    <div>

      <H1>New Project</H1>

      <Form method="POST">
        <Spacing>
          <Field type="text" name="name" placeholder="Name" />
          <Field type='textarea' name="description" placeholder="description" />
          <div>
            <Submit>Save</Submit>
          </div>
        </Spacing>
      </Form>
    </div>
  )
}
