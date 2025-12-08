import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { phones, phoneConfigs, locations } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  const { mac } = params;

  const [phone] = await db.select().from(phones).where(eq(phones.mac, mac));

  if (!phone) {
    throw error(404, "Phone not found");
  }

  const [phoneConfig] = await db
    .select()
    .from(phoneConfigs)
    .where(eq(phoneConfigs.phone_model, phone.model));

  const allLocations = await db.select().from(locations);

  return {
    phone,
    phoneConfig,
    locations: allLocations,
  };
};
