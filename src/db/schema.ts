import { pgTable, serial, varchar, timestamp, integer, text}  from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const savedPosts = pgTable("save_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull().default("UnTitled"),
  content: text("content").notNull().default("No Content"),
  createdAt: timestamp("created_at").defaultNow(),
  category:varchar("category").default("None")
})

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  category: varchar("category").default("None"),
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

export const categoryTree = pgTable('category_tree', {
  id: integer('id').primaryKey(),
  value: text('value').notNull(),
  parentId: integer('parent_id'), // 최상위 노드는 null
});

export const postRelations = relations(posts, ({ many }) => ({
  comments: many(comments)
}))

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id]
  })
}))