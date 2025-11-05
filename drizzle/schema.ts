import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2'
import { relations, sql } from "drizzle-orm";

export const users = sqliteTable('users', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  hId: text().$defaultFn(() => `${createId()}`).notNull(),
  username: text().notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
})


export const projects = sqliteTable('projects', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  hId: text().$defaultFn(() => `${createId()}`).notNull(),
  name: text().notNull(),
  description: text(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
})
export const messageBoards = sqliteTable('messageBoards', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  hId: text().$defaultFn(() => `${createId()}`).notNull(),
  title: text().notNull(),
  categories: text({ mode: 'json' }).$type<{ slug: string; label: string }[]>(),
  projectId: integer({ mode: 'number' }).notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
})

export const messages = sqliteTable('messages', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  hId: text().$defaultFn(() => `${createId()}`).notNull(),
  title: text().notNull(),
  html: text().notNull(),
  markdown: text().notNull(),
  raw: text().notNull(),
  category: text(),
  isPublished: integer({ mode: 'boolean' }).default(false),
  isPinned: integer({ mode: 'boolean' }).default(false),
  messageBoardId: integer({ mode: 'number' }).notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
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
