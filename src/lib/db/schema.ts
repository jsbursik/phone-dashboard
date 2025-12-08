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
import type { AdditionalFiles, GeneratedFile } from "$lib/types";
import { pgTable, text, json, serial, boolean } from "drizzle-orm/pg-core";

export const phoneConfigs = pgTable("phone_configs", {
  id: serial("id").primaryKey(),
  phone_model: text("phone-model").unique().notNull(),
  phone_cfg_filename: text("phone-cfg-filename").notNull(),
  phone_cfg: text("phone-cfg").notNull(),
  phone_cfg_is_model_specific: boolean("phone-cfg-is-model-specific").notNull().default(false),
  additional_files: json("additional_files").$type<AdditionalFiles[]>().notNull().default([]),
  variables: json("variables").$type<string[]>().notNull().default([]),
});

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const phones = pgTable("phones", {
  mac: text("mac").primaryKey(),
  model: text("model").notNull().references(() => phoneConfigs.phone_model),
  location: text("location").references(() => locations.name),
  generated_files: json("generated_files").$type<GeneratedFile[]>().notNull().default([]),
  custom_binaries: json("custom_binaries").$type<GeneratedFile[]>().notNull().default([]),
  variable_values: json("variable_values").$type<Record<string, string>>().notNull().default({}),
});
