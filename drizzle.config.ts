import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './drizzle/schema.ts',
  url: process.env.DATABASE_URL
})