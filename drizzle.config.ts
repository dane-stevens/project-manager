import { defineConfig } from 'drizzle-kit'

console.log(process.env.DATABASE_URL)
export default defineConfig({
  dialect: 'mysql',
  schema: './drizzle/schema.ts',
  dbCredentials: {
    url: String(process.env.DATABASE_URL)
  }
})