// Import and re-export Magic UI's Better-Auth schema
export * from "@jsbursik/magic-ui/server";

// Add your custom tables here
// Example:
// import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
// import { user } from "@jsbursik/magic-ui/server";
//
// export const posts = pgTable("posts", {
//   id: text("id").primaryKey(),
//   userId: text("user_id").notNull().references(() => user.id),
//   title: text("title").notNull(),
//   content: text("content"),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });
