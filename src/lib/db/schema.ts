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

// Import and re-export Magic UI's Better-Auth schema
export * from "@jsbursik/magic-ui/server";
import type { AdditionalFiles } from "$lib/types";
import { pgTable, text, json } from "drizzle-orm/pg-core";

export const phoneConfigs = pgTable("phone_configs", {
  phone_model: text("phone-model").primaryKey(),
  phone_cfg_filename: text("phone-cfg-filename").notNull(),
  phone_cfg: text("phone-cfg").notNull(),
  additional_files: json("additional_files").$type<AdditionalFiles[]>().notNull().default([]),
  variables: json("variables").$type<string[]>().notNull().default([]),
});
