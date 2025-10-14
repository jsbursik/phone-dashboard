import { createAuth } from "@jsbursik/magic-ui/server";
import { db } from "./db.js";
import * as schema from "$lib/db/schema.js";

export const auth = createAuth(db, schema);
