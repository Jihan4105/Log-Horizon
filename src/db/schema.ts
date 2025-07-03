import { pgTable, serial, varchar, boolean, timestamp, integer, text}  from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  lastLogin: timestamp("last_login").defaultNow(),
  comments: integer("comments").default(0),
  likes: integer("likes").default(0),
  hmms: integer("hmms").default(0),
  unlikes: integer("unlikes").default(0),
  isAdmin: boolean("is_admin").default(false)
})

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  likes: integer("likes").default(0),
  hmms: integer("hmms").default(0),
  unlikes: integer("unlikes").default(0),
})

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow()
})

export const userRelations = relations(users, ({ many }) => ({
  comments: many(comments)
}))


export const postRelations = relations(posts, ({ many }) => ({
  comments: many(comments)
}))

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id]
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id]
  })
}))