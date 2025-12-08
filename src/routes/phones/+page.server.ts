import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { phones } from "$lib/db/schema";

export const load: PageServerLoad = async () => {
  const allPhones = await db.select().from(phones);

  return {
    phones: allPhones,
  };
};
