import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from 'drizzle/schema'
import { env } from './env.server';
export const db = drizzle(env.DATABASE_URL, {
  mode: 'default',
  schema: schema,
});