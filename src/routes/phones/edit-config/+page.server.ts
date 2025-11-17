import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { phoneConfigs } from "$lib/db/schema";

export const load: PageServerLoad = async () => {
  return {
    models: await db.select({ id: phoneConfigs.id, phone_model: phoneConfigs.phone_model }).from(phoneConfigs),
  };
};
