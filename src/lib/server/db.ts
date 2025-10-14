import { createDatabase } from "@jsbursik/magic-ui/server";
import { env } from "$env/dynamic/private";

export const db = createDatabase(env.DATABASE_URL);
