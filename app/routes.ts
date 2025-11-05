import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('layouts/authorized.tsx', [
    index("routes/_index.tsx"),
    route('projects', 'routes/projects.tsx'),
    route('projects/new', 'routes/project-new.tsx'),
    route('project/:project_hId', 'routes/project.tsx'),
    route('project/:project_hId/message-board/:messageBoard_hId', 'routes/message-board.tsx'),
    route('project/:project_hId/message-board/:messageBoard_hId/new', 'routes/message-new.tsx'),
    route('project/:project_hId/message-board/:messageBoard_hId/message/:message_hId', 'routes/message.tsx'),
  ]),
  route('login', 'routes/login.tsx'),
] satisfies RouteConfig;
