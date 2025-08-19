import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const phone_cfgs = sqliteTable("phone_cfgs", {
  id: text().primaryKey(),
});

export const phones = sqliteTable("phones", {});
