import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { locations } from "$lib/db/schema";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async () => {
  const allLocations = await db.select().from(locations);
  return json(allLocations);
};

export const POST: RequestHandler = async ({ request }) => {
  const { name } = await request.json();

  if (!name || typeof name !== "string" || name.trim() === "") {
    return json({ error: "Location name is required" }, { status: 400 });
  }

  try {
    const [newLocation] = await db.insert(locations).values({ name: name.trim() }).returning();
    return json(newLocation, { status: 201 });
  } catch (error) {
    return json({ error: "Location already exists" }, { status: 409 });
  }
};

export const DELETE: RequestHandler = async ({ request }) => {
  const { id } = await request.json();

  if (!id || typeof id !== "number") {
    return json({ error: "Location ID is required" }, { status: 400 });
  }

  await db.delete(locations).where(eq(locations.id, id));
  return json({ success: true });
};
