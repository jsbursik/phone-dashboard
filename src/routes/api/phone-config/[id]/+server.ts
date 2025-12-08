import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { phoneConfigs } from "$lib/db/schema";

export const GET: RequestHandler = async ({ params }) => {
  const id = params.id;

  if (!id) {
    return json({ error: "ID required" }, { status: 400 });
  }

  const config = await db
    .select()
    .from(phoneConfigs)
    .where(eq(phoneConfigs.id, parseInt(id)))
    .limit(1);

  if (!config[0]) {
    return json({ error: "Not found" }, { status: 404 });
  }

  return json(config[0]);
};

export const PUT: RequestHandler = async ({ params, request }) => {
  const id = params.id;

  if (!id) {
    return json({ error: "ID required" }, { status: 400 });
  }

  const updates = await request.json();
  console.log(updates);

  await db
    .update(phoneConfigs)
    .set({
      phone_model: updates["phone-model"], // ← Transform the keys
      phone_cfg_filename: updates["phone-cfg-filename"],
      phone_cfg: updates["phone-cfg"],
      phone_cfg_is_model_specific: updates.phone_cfg_is_model_specific || false,
      additional_files: updates.additional_files || [],
      variables: updates.variables || [],
    })
    .where(eq(phoneConfigs.id, parseInt(id)));

  return json({ success: true });
};

export const DELETE: RequestHandler = async ({ params }) => {
  const id = params.id;

  if (!id) {
    return json({ error: "ID Required" }, { status: 400 });
  }

  await db.delete(phoneConfigs).where(eq(phoneConfigs.id, parseInt(id)));

  return json({ success: true });
};
