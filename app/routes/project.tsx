import { auth } from "~/utils/session.server";
import type { Route } from "./+types/project";
import { db } from "~/utils/db.server";
import { href, Link, redirect } from "react-router";
import { H1 } from "~/components/Headings";
import { Card } from "~/components/Card";

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

export default function Project({ loaderData }: Route.ComponentProps) {
  const { project } = loaderData
  return (
    <div>

      <H1>{project.name}</H1>
      {project.description && <div className="text-zinc-400 text-center -mt-6">{project.description}</div>}

      <div
        className="mt-8 grid grid-cols-3 gap-4">
        <Link className="group" to={href("/project/:project_hId/message-board/:messageBoard_hId", { project_hId: project.hId, messageBoard_hId: project.messageBoards[0].hId })}>
          <Card>
            <CardTitle title="Message Board">
              Message Board
            </CardTitle>
          </Card>
        </Link>
        <Link className="group"><Card><CardTitle title="To-dos"></CardTitle></Card></Link>
        <Link className="group"><Card><CardTitle title="Docs"></CardTitle></Card></Link>
        <Link className="group"><Card><CardTitle title="Chat"></CardTitle></Card></Link>
        <Link className="group"><Card><CardTitle title="Schedule"></CardTitle></Card></Link>
        <Link className="group"><Card><CardTitle title="Automatic Check-ins"></CardTitle></Card></Link>


      </div>

    </div >
  )
}

function CardTitle({ title, children }) {
  return (
    <div>
      <h2 className="text-center  font-semibold">{title}</h2>
      <div>{children}</div>
    </div>
  )
}