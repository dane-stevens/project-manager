import { text, bigint, datetime, mysqlTable, boolean, varchar, uniqueIndex } from "drizzle-orm/mysql-core";
import { createId } from '@paralleldrive/cuid2'
import { relations, sql } from "drizzle-orm";

export const users = mysqlTable('users', {
  id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
  hId: varchar({ length: 35 }).$defaultFn(() => `${createId()}`).notNull().unique(),
  username: varchar({ length: 255 }).notNull(),
  createdAt: datetime({ fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime({ fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(sql`CURRENT_TIMESTAMP(3)`),
}, (t) => [
  uniqueIndex('usernameIdx').on(t.username)
])


export const projects = mysqlTable('projects', {
  id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
  hId: varchar({ length: 35 }).$defaultFn(() => `${createId()}`).notNull().unique(),
  name: text().notNull(),
  description: text(),
  createdAt: datetime({ fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime({ fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(sql`CURRENT_TIMESTAMP(3)`),

})
export const messageBoards = mysqlTable('messageBoards', {
  id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
  hId: varchar({ length: 35 }).$defaultFn(() => `${createId()}`).notNull().unique(),
  title: text().notNull(),
  categories: text().$type<{ slug: string; label: string }[]>(),
  projectId: bigint({ mode: "number", unsigned: true }).notNull(),
  createdAt: datetime({ fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime({ fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(sql`CURRENT_TIMESTAMP(3)`),

})

export const messages = mysqlTable('messages', {
  id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
  hId: varchar({ length: 35 }).$defaultFn(() => `${createId()}`).notNull().unique(),
  title: text().notNull(),
  html: text().notNull(),
  markdown: text().notNull(),
  raw: text().notNull(),
  category: text(),
  isPublished: boolean().default(false),
  isPinned: boolean().default(false),
  messageBoardId: bigint({ mode: "number", unsigned: true }).notNull(),
  createdAt: datetime({ fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: datetime({ fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP(3)`).$onUpdate(sql`CURRENT_TIMESTAMP(3)`),

})


export const projectRelations = relations(projects, ({ many }) => ({
  messageBoards: many(messageBoards)
}))

export const messageBoardRelations = relations(messageBoards, ({ one, many }) => ({
  project: one(projects, {
    fields: [messageBoards.projectId],
    references: [projects.id]
  }),
  messages: many(messages)
}))

export const messageRelations = relations(messages, ({ one, many }) => ({
  messageBoard: one(messageBoards, {
    fields: [messages.messageBoardId],
    references: [messageBoards.id]
  }),
}))
