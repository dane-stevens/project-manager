import { drizzle } from 'drizzle-orm/libsql';
import * as schema from 'drizzle/schema'
export const db = drizzle({
  schema: schema,
  connection: {
    url: process.env.DATABASE_URL,
  }
});