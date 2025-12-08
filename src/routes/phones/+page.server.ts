import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { phoneConfigs } from "$lib/db/schema";

export const load: PageServerLoad = async () => {
  return {
    phones: {},
  };
};
