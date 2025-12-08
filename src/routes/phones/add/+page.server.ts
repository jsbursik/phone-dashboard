import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { phoneConfigs, locations } from "$lib/db/schema";

export const load: PageServerLoad = async () => {
  const models = await db.select().from(phoneConfigs);
  const allLocations = await db.select().from(locations);

  return {
    models,
    locations: allLocations,
  };
};
