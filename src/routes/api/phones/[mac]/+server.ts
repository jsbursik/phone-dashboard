import type { RequestHandler } from "@sveltejs/kit";
import type { GeneratedFile } from "$lib/types";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { phones, phoneConfigs } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import {
  generatePhoneFiles,
  writeFilesToDisk,
  deleteFilesFromDisk,
  fileToBase64,
} from "$lib/server/file-generation";

export const GET: RequestHandler = async ({ params }) => {
  const { mac } = params;

  const [phone] = await db.select().from(phones).where(eq(phones.mac, mac));

  if (!phone) {
    return json({ error: "Phone not found" }, { status: 404 });
  }

  return json(phone);
};

export const PUT: RequestHandler = async ({ params, request }) => {
  const { mac } = params;
  const formData = await request.formData();
  const location = formData.get("location") as string | null;
  const variableValuesJson = formData.get("variable_values") as string;

  // Get existing phone
  const [existingPhone] = await db.select().from(phones).where(eq(phones.mac, mac));

  if (!existingPhone) {
    return json({ error: "Phone not found" }, { status: 404 });
  }

  // Parse variable values
  let variableValues: Record<string, string>;
  try {
    variableValues = JSON.parse(variableValuesJson);
  } catch {
    return json({ error: "Invalid variable values format" }, { status: 400 });
  }

  // Don't automatically add MAC - user provides all variables in the form

  // Get phone config template
  const [phoneConfig] = await db
    .select()
    .from(phoneConfigs)
    .where(eq(phoneConfigs.phone_model, existingPhone.model));

  if (!phoneConfig) {
    return json({ error: "Phone model not found" }, { status: 404 });
  }

  // Generate new files from template
  const generatedFiles = generatePhoneFiles(phoneConfig, variableValues);

  // Process custom binary uploads
  const customBinaries: GeneratedFile[] = [...existingPhone.custom_binaries];
  const binaryFiles = formData.getAll("binaries") as File[];

  for (const file of binaryFiles) {
    if (file.size > 0) {
      const base64Content = await fileToBase64(file);
      customBinaries.push({
        filename: file.name,
        content: base64Content,
        is_binary: true,
      });
    }
  }

  // Delete old files from disk
  const oldFilenames = [
    ...existingPhone.generated_files.map((f) => f.filename),
    ...existingPhone.custom_binaries.map((f) => f.filename),
  ];

  try {
    await deleteFilesFromDisk(oldFilenames);
  } catch (error) {
    console.error("Failed to delete old files:", error);
  }

  // Write new files to disk
  const allFiles = [...generatedFiles, ...customBinaries];

  try {
    await writeFilesToDisk(allFiles);
  } catch (error) {
    console.error("Failed to write files to disk:", error);
    return json({ error: "Failed to write files to disk" }, { status: 500 });
  }

  // Update database
  try {
    await db
      .update(phones)
      .set({
        location: location || null,
        generated_files: generatedFiles,
        custom_binaries: customBinaries,
        variable_values: variableValues,
      })
      .where(eq(phones.mac, mac));

    return json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return json({ error: "Failed to update phone in database" }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  const { mac } = params;

  // Get existing phone
  const [existingPhone] = await db.select().from(phones).where(eq(phones.mac, mac));

  if (!existingPhone) {
    return json({ error: "Phone not found" }, { status: 404 });
  }

  // Delete files from disk
  const filenames = [
    ...existingPhone.generated_files.map((f) => f.filename),
    ...existingPhone.custom_binaries.map((f) => f.filename),
  ];

  try {
    await deleteFilesFromDisk(filenames);
  } catch (error) {
    console.error("Failed to delete files from disk:", error);
  }

  // Delete from database
  await db.delete(phones).where(eq(phones.mac, mac));

  return json({ success: true });
};
