import { auth } from "~/utils/session.server";
import type { Route } from "./+types/project";
import { db } from "~/utils/db.server";
import { href, Link, redirect } from "react-router";
import { H1 } from "~/components/Headings";

export async function loader({ request, params }: Route.LoaderArgs) {
  await auth(request)
  const project = await db.query.projects.findFirst({
    where: (projects, { eq }) => eq(projects.hId, params.project_hId),
    with: {
      messageBoards: true
    }
  })

  if (!project) return redirect(href("/projects"))

  return { project }
}

export function ServerComponent({ loaderData }: Route.ComponentProps) {
  const { project } = loaderData
  return (
    <div>

      <H1>{project.name}</H1>
      {project.description && <div className="text-zinc-400 text-center -mt-6">{project.description}</div>}

      <div className="mt-8 grid grid-cols-3 gap-4">
        <Card title="Message Board">
          <Link to={href("/project/:project_hId/message-board/:messageBoard_hId", { project_hId: project.hId, messageBoard_hId: project.messageBoards[0].hId })}>Message Board</Link>
        </Card>
        <Card title="To-dos"></Card>
        <Card title="Docs"></Card>
        <Card title="Chat"></Card>
        <Card title="Schedule"></Card>
        <Card title="Automatic Check-ins"></Card>


      </div>

    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl">
      <h2 className="text-center  font-semibold">{title}</h2>
      <div>{children}</div>
    </div>
  )
}