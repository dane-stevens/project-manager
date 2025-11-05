import { Form, href, Link } from "react-router";
import { Field } from "~/components/Forms";
import { messageBoards, projects } from "drizzle/schema";
import { db } from "~/utils/db.server";
import type { Route } from "./+types/projects";
import { H1 } from "~/components/Headings";
import { Spacing } from "~/components/Spacing";
import { Card } from "~/components/Card";

export async function loader({ request }: Route.LoaderArgs) {
  const projects = await db.query.projects.findMany()
  return {
    projects
  }
}

export async function action({ request }) {
  const formData = await request.formData()

  const data = Object.fromEntries(formData)

  const project = await db.insert(projects).values({
    name: data.name,
    description: data.description
  }).returning({ id: projects.id })

  await db.insert(messageBoards).values({
    title: 'Message Board',
    projectId: project[0].id
  })

  return null

}

export function ServerComponent({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData
  return (
    <div>

      <H1>Projects</H1>
      <Link to={href("/projects/new")}>New Project</Link>
      <Spacing>
        {
          projects?.map((project) => {
            return (
              <Link key={project.id} to={href("/project/:project_hId", { project_hId: project.hId })}>
                <Card>
                  {project.name}
                </Card>
              </Link>
            )
          })
        }
      </Spacing>

      {/* <Form method="POST">
        <Field type="text" name="name" placeholder="Name" />
        <Field type='textarea' name="description" placeholder="description" />
        <button type='submit'>Save</button>

      </Form> */}
    </div>
  )
}