import z from "zod";

const ENV = z.object({
  DATABASE_URL: z.string(),
  SESSION_SECRET: z.string()
})

const env = ENV.parse(process.env)

export { env }